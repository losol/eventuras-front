'use client';

import EventEditor from '@/app/admin/events/EventEditor';
import { Loading } from '@/components/feedback';
import { useEvent } from '@/hooks/apiHooks';

const EditEvent = ({ params }: { params: any }) => {
  const eventId = parseInt(params.id as string, 10);
  const { loading, event } = useEvent(eventId);
  if (loading) {
    return <Loading />;
  }
  return <EventEditor eventinfo={event} />;
};
export default EditEvent;
