'use client';
import React from 'react';

import Button from '@/components/inputs/Button';
import { Layout } from '@/components/layout';
import { AppNotificationType, useAppNotifications } from '@/hooks/useAppNotifications';

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
              id: Date.now(),
              message: 'This stays for 2 seconds',
              type: AppNotificationType.SUCCESS,
              expiresAfter: 2000,
            })
          }
        >
          2-sec Success
        </Button>
        <Button
          onClick={() =>
            addAppNotification({
              id: Date.now(),
              message: 'This stays for 4 seconds',
              type: AppNotificationType.ERROR,
              expiresAfter: 4000,
            })
          }
        >
          4-sec Error
        </Button>
        <Button
          onClick={() =>
            addAppNotification({
              id: Date.now(),
              message: 'This stays for 6 seconds',
              type: AppNotificationType.INFO,
              expiresAfter: 6000,
            })
          }
        >
          6-sec Info
        </Button>
        <Button
          onClick={() =>
            addAppNotification({
              id: Date.now(),
              message: 'This stays indefinitely',
              type: AppNotificationType.INFO,
              expiresAfter: 0,
            })
          }
        >
          Indefinite Info
        </Button>
      </div>
    </Layout>
  );
};

export default ToasterPage;
