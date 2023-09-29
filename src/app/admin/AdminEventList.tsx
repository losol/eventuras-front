'use client';

import { EventDto } from '@losol/eventuras';
import { IconMailForward } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { createColumnHelper, DataTable } from '@/components/content';
import EventEmailer from '@/components/event/EventEmailer';
import { Drawer } from '@/components/layout';
const columnHelper = createColumnHelper<EventDto>();
interface AdminEventListProps {
  eventinfo: EventDto[];
}

const AdminEventList: React.FC<AdminEventListProps> = ({ eventinfo = [] }) => {
  const [eventOpened, setEventOpened] = useState<EventDto | null>(null);

  const renderEventItemActions = (info: EventDto) => {
    return (
      <>
        <IconMailForward className="cursor-pointer" onClick={() => setEventOpened(info)} />
      </>
    );
  };

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: info => (
        <Link href={`/admin/events/${info.row.original.id}/edit`}> {info.getValue()}</Link>
      ),
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('dateStart', {
      header: 'When',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: info => renderEventItemActions(info.row.original),
    }),
  ];
  const drawerIsOpen = eventOpened !== null;
  return (
    <>
      <DataTable
        data={eventinfo}
        columns={columns}
        clientsidePaginationPageSize={250}
        clientsidePagination
      />
      <Drawer isOpen={drawerIsOpen} onCancel={() => setEventOpened(null)}>
        <Drawer.Header as="h3" className="text-black">
          {eventOpened?.title}
        </Drawer.Header>
        <Drawer.Body>
          <EventEmailer
            eventTitle="This is an event"
            eventId={20}
            onClose={() => setEventOpened(null)}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <></>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default AdminEventList;
