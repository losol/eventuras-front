import { useContext, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import parse from 'html-react-parser';
import { Button, Card, CardBody, CardHeader, Container, Heading, useDisclosure, Text, Grid, GridItem, GridItemProps } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { EventCardHeader, AlertModal, Layout, EventMetas } from 'components';
import { EventDto } from '@losol/eventuras';
import { UserContext } from 'context';
import { registerForEvent } from 'services';
import { formatMetas } from 'helpers';

// Column Styles
const gridGap = 6;
const scrollColumnProps: GridItemProps = {
  h: '100%',
  overflowY: 'auto',
  pt: 8,
  pb: 12,
  mr: -gridGap, // Scrollbar outside of column content
  pr: gridGap, // Scrollbar outside of column content
};

type EventDetailPageProps = {
  event: EventDto;
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

  const metas = formatMetas(type, category);

  const { data: session, status: sessionStatus } = useSession();
  const { user } = useContext(UserContext);

  const [modal, setModal] = useState({ title: '', text: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const register = async () => {
    // TODO: Delete check when API data will be defined
    if (!!user.id && !!id) {
      await registerForEvent(
        { userId: user.id, eventId: id },
        session?.user.accessToken
      );
      setModal({
        title: 'Welcome!',
        text: `Welcome to ${title}`,
      });
      onOpen();
    };
  };

  const loginAndRegister = async () => {
    const res = await signIn('auth0');
    res?.ok && register();
    // TODO: Think. Maybe: handle res.error - alert
  };

  return (
    <Layout>
      <Container maxW='container.xl' h='100%'>
        <Grid
          gap={gridGap}
          templateColumns='repeat(12, 1fr)'
          h='100%'
        >
          <GridItem colSpan={[null, 7, 8]} {...scrollColumnProps}>
            <Card mb={6} id='main'>
              <EventCardHeader featured={featured} status={status} />
              <CardHeader pb='0'>
                <Heading as='h1' mb='3'>
                  {title}
                </Heading>

                <Text mb='2' color='blackAlpha.800' fontWeight='bold' display='flex' alignItems='center'>
                  <CalendarIcon mr='2' />
                  {/* TODO: Delete check when API data will be defined */}
                  {dateStart && dateEnd &&
                    <>
                      {dateStart} - {dateEnd}
                    </>
                  }
                </Text>

                <Text mb='2' color='blackAlpha.600' fontWeight='bold'>
                  {city && city + ', '}
                  {location}
                </Text>
              </CardHeader>
              <CardBody>
                <Text mb={3}>
                  {description}
                </Text>
                {
                  metas.length !== 0 && <EventMetas metas={metas} />
                }
              </CardBody>
            </Card>

            {/* TODO: Delete check when API data will be defined */}
            {program &&
              <Card id='program'>
                <CardHeader pb='0'>
                  <Heading as='h2' mb='3'>
                    Program
                  </Heading>
                </CardHeader>
                <CardBody>
                  {/* Do not wrap into Chakra Text. It is HTML string from server. To prevent hydration error <p> in <p> */}
                  {parse(program)}
                </CardBody>
              </Card>
            }

            {
              practicalInformation &&
              <Card id='practical-information'>
                <CardHeader pb='0'>
                  <Heading as='h2' mb='3'>
                    Practical information
                  </Heading>
                </CardHeader>
                <CardBody>
                  {/* Do not wrap into Chakra Text. It is HTML string from server. To prevent hydration error <p> in <p> */}
                  {parse(practicalInformation)}
                </CardBody>
              </Card>
            }

            <Button
              colorScheme='teal'
              isLoading={sessionStatus === 'loading'}
              onClick={session ? register : loginAndRegister}
            >
              Register
            </Button>
          </GridItem>

          <GridItem colSpan={[null, 5, 4]} {...scrollColumnProps}>
            <Card>
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
  id?: string; // TODO: Delete check when API data will be defined
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
  const paths = events.data.map((event: EventDto) => ({
    params: {
      // TODO: Fix error:'event.id' is possibly 'undefined' when API data will be defined
      id: event.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false
  };
}
export default EventDetailPage;
