import { Button, Container, Heading, useDisclosure } from '@chakra-ui/react';
import { AlertModal, Layout } from 'components';
import { UserContext } from 'context';
import { signIn, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { registerForEvent } from 'services';
import { EventDetailType } from 'types';

type EventDetailPageProps = {
  event: EventDetailType;
};

const EventDetailPage = (props: EventDetailPageProps) => {
  const {
    id,
    category,
    city,
    dateEnd,
    dateStart,
    description,
    featured,
    location,
    // slug,
    status,
    title,
    type,
    practicalInformation,
    program,
  } = props.event;

  const { data: session, status: sessionStatus } = useSession();
  const { user } = useContext(UserContext);

  const [modal, setModal] = useState({ title: '', text: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRegistrationEventRequest = async () => {
    // TODO: Auth task. Run it only if the data is not undefined and not null
    await registerForEvent(
      {
        userId: user.id,
        eventId: id,
      },
      session?.user.accessToken
    );
    setModal({
      title: 'Welcome!',
      text: `Welcome to ${title}`,
    });
    onOpen();
  };

  const handleLoginAndRegistrationEvent = async () => {
    try {
      await signIn('auth0');
      localStorage.setItem('EVENT_REGISTRATION_AFTER_LOGIN', 'true');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      user &&
      user.id &&
      localStorage.getItem('EVENT_REGISTRATION_AFTER_LOGIN')
    ) {
      handleRegistrationEventRequest();
      localStorage.removeItem('EVENT_REGISTRATION_AFTER_LOGIN');
    }
  }, [user]);

  return (
    <Layout>
      <Container marginTop="32">
        <Heading>{title}</Heading>
        {description}
        <br />
        {!session && (
          <Button
            colorScheme="teal"
            mt={5}
            variant="outline"
            isLoading={sessionStatus === 'loading'}
            onClick={handleLoginAndRegistrationEvent}
          >
            Login and register for event
          </Button>
        )}
        {session && (
          <Button
            colorScheme="teal"
            variant="outline"
            mt={5}
            // isLoading={sessionStatus === 'loading'}
            onClick={handleRegistrationEventRequest}
          >
            Register for event
          </Button>
        )}
        <AlertModal
          isOpen={isOpen}
          onClose={onClose}
          title={modal.title}
          text={modal.text}
        />
      </Container>
    </Layout>
  );
};

type Params = {
  id: string;
};

export async function getStaticProps({ params }: { params: Params }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/v3/events/' + params.id
  );
  const event = await res.json();
  return {
    props: {
      event
    }
  };
};

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/v3/events/');
  const events = await res.json();

  // TODO: loop through pagination?
  const paths = events.data.map((event: EventDetailType) => ({
    params: {
      id: event.id.toString(),
    },
  }));

  return { paths, fallback: false };
}
export default EventDetailPage;
