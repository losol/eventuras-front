'use client';

import createTranslation from 'next-translate/createTranslation';
import { useState } from 'react';

import EventEmailer from '@/components/event/EventEmailer';
import { Container, Drawer, Layout } from '@/components/ui';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import Heading from '@/components/ui/Heading';
import Link from '@/components/ui/Link';
import Loading from '@/components/ui/Loading';
import useCreateHook from '@/hooks/createHook';
import { createSDK } from '@/utils/api/EventurasApi';

import AddUserToEvent from '../../components/AddUserToEvent';
import EventParticipantList from '../../components/EventParticipantList';

type EventInfoProps = {
  params: {
    id: number;
  };
};
/**
 * Initial set up of admin event detail page. WIP.
 * TODO there are a few commonalities with user event detail page and AdminEventList - when this page stops diverging it would be worthwhile
 * to extract common blocks of functionality in different components
 * @returns
 */
const EventDetailPage: React.FC<EventInfoProps> = ({ params }) => {
  const eventId = params.id;
  const [registrationSeed, setRegistrationSeed] = useState(0);

  const { t } = createTranslation();
  const sdk = createSDK();
  const { loading: eventsLoading, result: event } = useCreateHook(
    () => sdk.events.getV3Events1({ id: eventId }),
    [eventId]
  );
  const { loading: loadingEventProducts, result: eventProducts } = useCreateHook(
    () => sdk.eventProducts.getV3EventsProducts({ eventId }),
    [eventId]
  );
  const { result: registrations } = useCreateHook(
    () =>
      sdk.registrations.getV3Registrations({
        eventId,
        includeUserInfo: true,
        includeProducts: true,
      }),
    [registrationSeed]
  );

  const [emailDrawerOpen, setEmailDrawerOpen] = useState<boolean>(false);
  if (eventsLoading || loadingEventProducts) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container>
        {eventsLoading && <Loading />}
        {event && (
          <>
            <Heading as="h1">{event.title ?? ''}</Heading>
            <ButtonGroup>
              <Link href={`/admin/events/${event.id}/edit`} variant="button-outline">
                {t('common:labels.edit')}
              </Link>
              <Link href={`/admin/events/${event.id}/products`} variant="button-outline">
                {t('common:labels.products')}
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setEmailDrawerOpen(true);
                }}
              >
                {t('admin:eventEmailer.title')}
              </Button>
            </ButtonGroup>
            <AddUserToEvent
              event={event}
              eventProducts={eventProducts ?? []}
              onUseradded={() => {
                setRegistrationSeed(registrationSeed + 1);
              }}
            />

            <Drawer isOpen={emailDrawerOpen} onCancel={() => setEmailDrawerOpen(false)}>
              <Drawer.Header as="h3" className="text-black">
                {t('admin:eventEmailer.title')}
              </Drawer.Header>
              <Drawer.Body>
                <EventEmailer
                  eventTitle={event.title!}
                  eventId={event.id!}
                  onClose={() => setEmailDrawerOpen(false)}
                />
              </Drawer.Body>
              <Drawer.Footer>
                <></>
              </Drawer.Footer>
            </Drawer>
          </>
        )}
        {event && registrations ? (
          <EventParticipantList participants={registrations.data ?? []} event={event} />
        ) : (
          <Loading />
        )}
      </Container>
    </Layout>
  );
};

export default EventDetailPage;
