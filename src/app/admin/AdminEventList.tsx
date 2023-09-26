'use client';

import { EventDto } from '@losol/eventuras';
import { IconMailForward } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { createColumnHelper, DataTable } from '@/components/content';
import MarkdownEditor from '@/components/editors/MarkdownEditor';
import Button, { blueBlockClasses } from '@/components/inputs/Button';
import { Drawer } from '@/components/layout';
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
          <MarkdownEditor />
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
            <Button className={`flex-auto justify-center m-1 ${blueBlockClasses}`}>Send</Button>
            <Button className={`flex-auto justify-center m-1m ${blueBlockClasses}`}>Cancel</Button>
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <></>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default AdminEventList;
