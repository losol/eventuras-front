import { memo, useMemo } from 'react';
import NextLink from 'next/link';
import { Text, Card, CardBody, CardHeader, Heading, CardFooter, Box, Badge, Button, Flex } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { EventCardHeader, EventMetas } from 'components';
import { EventPreviewType } from 'types';

const EventCard = memo(function EventCard({ event }: { event: EventPreviewType }) {
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

  // TODO: Write function to map through passed metas, return string[] and memorize. Add to event detail pages
  const metas = useMemo(
    () => {
      let metas: string[] = [];
      type !== null && metas.push(type);
      category !== null && metas.push(category);
      return metas;
    },
    [type, category]
  );

  return (
    <Card
    >
      <EventCardHeader featured={featured} status={status} />
      <CardHeader pb='0'>
        <NextLink href={`/events/${id}`}>
          <Heading as='h3' size='lg' mb='2' noOfLines={2}>
            {title}
          </Heading>
        </NextLink>
        <Text fontSize='sm' mb='1' color='blackAlpha.800' fontWeight='bold' display='flex' alignItems='center'>
          <CalendarIcon mr='2' />
          {dateStart} - {dateEnd}
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
          colorScheme='gray'
          width='full'
        >
          Vis kurset &raquo;
        </Button>
      </CardFooter>
    </Card >
  );
});

export default EventCard;
