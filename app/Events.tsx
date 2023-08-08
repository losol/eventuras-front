import { EventsService } from '@losol/eventuras';

import { Heading, Text } from '../components/content';
import EventsGrid from '../components/event/common/EventsGrid';

async function getData() {
  const events = await EventsService.getV3Events({});

  return events.data;
}

export default async function Page() {
  const eventData = await getData();

  return (
    <>
      <Heading as="h2">Events</Heading>

      {eventData && eventData.length > 0 ? (
        <EventsGrid events={eventData} />
      ) : (
        <Text>More events TBA</Text>
      )}
    </>
  );
}
