import { redirect } from 'next/navigation';

import { Container, Layout } from '@/components/ui';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import createSDK from '@/utils/createSDK';
import Environment from '@/utils/Environment';
import formatDate from '@/utils/formatDate';
import Logger from '@/utils/Logger';

import EventDetails from '../components/EventDetails';
import EventRegistrationButton from '../components/EventRegistrationButton';

type EventInfoProps = {
  params: {
    id: number;
    slug: string;
  };
};

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const orgId = parseInt(Environment.NEXT_PUBLIC_ORGANIZATION_ID);

  Logger.info(
    { namespace: 'events:staticparams' },
    `Api Base url: ${Environment.NEXT_PUBLIC_BACKEND_URL}, orgId: ${orgId})`
  );

  const eventuras = createSDK({ baseUrl: Environment.NEXT_PUBLIC_BACKEND_URL });
  const eventInfos = await eventuras.events.getV3Events({
    organizationId: orgId,
  });

  if (!eventInfos) return [];

  if (eventInfos.data) {
    const staticParams = eventInfos.data.map(eventInfo => ({
      id: eventInfo.id?.toString(),
      slug: eventInfo.slug,
    }));
    Logger.info({ namespace: 'events:staticparams' }, 'Static params:', staticParams);
    return staticParams;
  }

  return [];
}

const Page: React.FC<EventInfoProps> = async ({ params }) => {
  const eventuras = createSDK();

  const eventinfo = await eventuras.events.getV3Events1({ id: params.id });
  if (!eventinfo) return <div>Event not found</div>;

  if (params.slug !== eventinfo.slug) {
    redirect(`/events/${eventinfo.id!}/${eventinfo.slug!}`);
  }

  return (
    <Layout fluid>
      {eventinfo?.featuredImageUrl && (
        <Card
          className="mx-auto min-h-[33vh]"
          {...(eventinfo?.featuredImageUrl && { backgroundImage: eventinfo.featuredImageUrl })}
        ></Card>
      )}
      <section className="py-16">
        <Container>
          <Heading as="h1" spacingClassName="pt-6 pb-3">
            {eventinfo?.title ?? 'Mysterious Event'}
          </Heading>
          {eventinfo.headline && (
            <Heading
              as="h2"
              className="text-xl font-semibold text-gray-700"
              spacingClassName="py-3"
            >
              &mdash; {eventinfo.headline}
            </Heading>
          )}

          <Text text={eventinfo.description} className="py-3" />
          <Text
            text={formatDate(
              eventinfo.dateStart as string,
              eventinfo.dateEnd as string,
              Environment.NEXT_PUBLIC_DEFAULT_LOCALE
            )}
            className="py-3"
          />

          {eventinfo?.city}
          <EventRegistrationButton eventId={eventinfo.id!} />
        </Container>
      </section>

      <EventDetails eventinfo={eventinfo} />
    </Layout>
  );
};

export default Page;
