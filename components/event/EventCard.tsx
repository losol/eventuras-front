import { memo, useMemo } from 'react';
import NextLink from 'next/link';
import { Text, Card, CardBody, CardHeader, Heading, CardFooter, Button } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { EventCardHeader, EventMetas } from 'components';
import { EventDto } from '@losol/eventuras';
import { formatMetas } from 'helpers';

const EventCard = memo(function EventCard({ event }: { event: EventDto }) {
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
  } = event;

  const metas = useMemo(
    () => formatMetas(type, category),
    [type, category]
  );

  return (
    <Card>
      <EventCardHeader featured={featured} status={status} />
      <CardHeader pb='0'>
        <NextLink href={`/events/${id}`}>
          <Heading as='h3' size='lg' mb='2' noOfLines={2}>
            {title}
          </Heading>
        </NextLink>
        <Text fontSize='sm' mb='1' color='blackAlpha.800' fontWeight='bold' display='flex' alignItems='center'>
          <CalendarIcon mr='2' />
          {/* TODO: Delete check when API data will be defined */}
          {dateStart && dateEnd &&
            <>
              {dateStart} - {dateEnd}
            </>
          }
        </Text>
        <Text fontSize='sm' mb='1' color='blackAlpha.600' fontWeight='bold'>
          {city && city + ', '}
          {location}
        </Text>
      </CardHeader>
      <CardBody>
        <Text mb='3' noOfLines={3}>
          {description}
        </Text>
        {
          metas.length !== 0 && <EventMetas metas={metas} />
        }
      </CardBody>
      <CardFooter display='block' pt='0'>
        <Button
          as={NextLink}
          href={`/events/${id}`}
          colorScheme='teal'
          variant='solid'
          width='full'
        >
          Vis kurset &raquo;
        </Button>
      </CardFooter>
    </Card >
  );
});

export default EventCard;
