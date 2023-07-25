import NextLink from 'next/link';
import { Text, Card, CardBody, CardHeader, Heading, CardFooter, Box } from '@chakra-ui/react';
import { EventStatusBadge } from 'components';
import { MetaItem } from './components';
import { EventPreviewType } from 'types';

const EventCard = ({ event }: { event: EventPreviewType }) => {
  const {
    category,
    city,
    dateEnd,
    dateStart,
    description,
    featured,
    lastRegistrationDate,
    location,
    onDemand,
    practicalInformation,
    program,
    slug,
    status,
    title,
    type,
  } = event;

  const meta = {
    'Type': type,
    'Category': category,
    'Program': program,
    'Start': dateStart,
    'End': dateEnd,
    'Last registration date': lastRegistrationDate,
    'Location': location,
    'City': city,
    'Practical information': practicalInformation,
    'Featured': featured,
    'OnDemand': onDemand,
  };

  return (
    <Card
      as={NextLink}
      href={`/events/${slug}`} // TODO: Test slug work after create Event Detail Page
    >
      <EventStatusBadge status={status} />
      <CardHeader>
        <Heading as='h3'>
          {title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>
          {description}
        </Text>
      </CardBody>
      <CardFooter>
        <div>
          <Heading size='xs'>
            Meta
          </Heading>
          <Box fontSize='sm'>
            {Object.entries(meta).map(([key, value]) => (
              <MetaItem key={key} text={key} value={value} />
            ))}
          </Box>
        </div>
      </CardFooter>
    </Card >
  );
};

export default EventCard;
