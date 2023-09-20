'use client';
import React from 'react';

import Button from '@/components/inputs/Button';
import { Layout } from '@/components/layout';
import { useAppNotifications } from '@/hooks/useAppNotifications';
import { ERROR, INFO, SUCCESS } from '@/types/appNotificationTypes';

const ToasterPage = () => {
  const { addAppNotification } = useAppNotifications();

  return (
    <Layout>
      <h1>This page only for testing</h1>
      <p>Should remember to delete it.. and make some stories instead.</p>
      <div>
        <Button
          onClick={() =>
            addAppNotification({
              message: 'This stays for 2 seconds',
              type: SUCCESS,
              expiresAfter: 2000,
            })
          }
        >
          2-sec Success
        </Button>
        <Button
          onClick={() =>
            addAppNotification({
              message: 'This stays for 4 seconds',
              type: ERROR,
              expiresAfter: 4000,
            })
          }
        >
          4-sec Error
        </Button>
        <Button
          onClick={() =>
            addAppNotification({
              message: 'This stays for 6 seconds',
              type: INFO,
              expiresAfter: 6000,
            })
          }
        >
          6-sec Info
        </Button>
        <Button
          onClick={() =>
            addAppNotification({ message: 'This stays indefinitely', type: INFO, expiresAfter: 0 })
          }
        >
          Indefinite Info
        </Button>
      </div>
    </Layout>
  );
};

export default ToasterPage;
