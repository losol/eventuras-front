import { useContext, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import parse from 'html-react-parser';
import {
  Button, Card, CardBody, CardHeader, Container, Heading, useDisclosure, Text, Grid, GridItem, Flex, Badge
} from '@chakra-ui/react';
import { AlertModal, EventStatusBadge, Layout } from 'components';
import { EventCardHeader } from 'components';
import { UserContext } from 'context';
import { registerForEvent } from 'services';
import { EventDetailType } from 'types';
import { CalendarIcon } from '@chakra-ui/icons';

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

  console.log(props.event);

  return (
    <Layout>
      <Container maxW='container.xl'>
        <Grid
          gap={6}
          templateColumns='repeat(12, 1fr)'
        >
          <GridItem colSpan={[null, 7, 8]}>

            <Card mb={6} id='main'>
              <EventCardHeader featured={featured} status={status} />

              <CardHeader pb='0'>
                <Heading as='h1' mb='3'>
                  {title}
                </Heading>

                <Text mb='2' color='blackAlpha.800' fontWeight='bold' display='flex' alignItems='center'>
                  <CalendarIcon mr='2' />
                  {dateStart} - {dateEnd}
                </Text>

                <Text mb='2' color='blackAlpha.600' fontWeight='bold'>
                  {city && city + ', '}
                  {location}
                </Text>
              </CardHeader>
              <CardBody>
                <Text>
                  {description}
                </Text>

              </CardBody>
            </Card>

            <Card id='program'>
              <CardHeader pb='0'>
                <Heading as='h2' mb='3'>
                  Program
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  {parse(program)}
                </Text>
              </CardBody>
            </Card>

            {
              practicalInformation &&
              <Card id='practical-information'>
                <CardHeader pb='0'>
                  <Heading as='h2' mb='3'>
                    Practical information
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    {parse(practicalInformation)}
                  </Text>
                </CardBody>
              </Card>
            }

            {!session && (
              <Button
                colorScheme="teal"
                mt={5}
                isLoading={sessionStatus === 'loading'}
                onClick={handleLoginAndRegistrationEvent}
              >
                Login and register for event
              </Button>
            )}
            {session && (
              <Button
                colorScheme="teal"
                mt={5}
                // isLoading={sessionStatus === 'loading'}
                onClick={handleRegistrationEventRequest}
              >
                Register for event
              </Button>
            )}


          </GridItem>

          <GridItem colSpan={[null, 5, 4]}>
            <Card>
              <CardHeader pb='0'>
                <Heading as='h1' mb='3'>
                  Right
                </Heading>
              </CardHeader>
              <CardBody>

                <Button as='a' width='full' mb={2} href='#main'>
                  Main Info
                </Button>
                <Button as='a' width='full' mb={2} href='#program'>
                  Program
                </Button>

                {
                  practicalInformation &&
                  <Button as='a' width='full' mb={2} href='#pratical-information'>
                    Pratical Information
                  </Button>
                }

                <Button width='full' mt={4} colorScheme='teal'>
                  Register
                </Button>


              </CardBody>
            </Card>

          </GridItem>
        </Grid>
      </Container>

      <AlertModal
        isOpen={isOpen}
        onClose={onClose}
        title={modal.title}
        text={modal.text}
      />

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

  return {
    paths,
    fallback: false
  };
}
export default EventDetailPage;
