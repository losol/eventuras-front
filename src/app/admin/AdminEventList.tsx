'use client';

import { EventDto } from '@losol/eventuras';
import { IconMailForward } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { createColumnHelper, DataTable } from '@/components/content';
import MarkdownEditor from '@/components/inputs/MarkdownEditor';
import Button, { blueBlockClasses } from '@/components/inputs/Button';
import { Drawer } from '@/components/layout';
import { InputText } from '@/components/inputs/Input';
import EventEmailer from '@/components/event/EventEmailer';
const columnHelper = createColumnHelper<EventDto>();
interface AdminEventListProps {
  eventinfo: EventDto[];
}

const AdminEventList: React.FC<AdminEventListProps> = ({ eventinfo = [] }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const actions = (
    <>
      <IconMailForward className="cursor-pointer" onClick={() => setDrawerIsOpen(true)} />
    </>
  );

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
      cell: () => actions,
    }),
  ];

  return (
    <>
      <DataTable
        data={eventinfo}
        columns={columns}
        clientsidePaginationPageSize={250}
        clientsidePagination
      />
      <Drawer isOpen={drawerIsOpen} onCancel={() => setDrawerIsOpen(false)}>
        <Drawer.Header className="text-black">
          Send Notification Email to Participants
        </Drawer.Header>
        <Drawer.Body>
          <EventEmailer eventTitle="This is an event" eventId={20} />
        </Drawer.Body>
        <Drawer.Footer>
          <></>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default AdminEventList;
