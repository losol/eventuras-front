'use client';
import React from 'react';

import Button from '@/components/inputs/Button';
import { Layout } from '@/components/layout';
import { useAddNotification } from '@/hooks/useAddNotification';
import { ERROR, INFO, SUCCESS } from '@/types/notificationTypes';

const ToasterPage = () => {
  const addNotification = useAddNotification();

  return (
    <Layout>
      <h1>This page only for testing</h1>
      <p>Should remember to delete it.. and make some stories instead.</p>
      <div className="App">
        <Button onClick={() => addNotification('This is a success message', SUCCESS)}>
          Show Success Notification
        </Button>
        <Button onClick={() => addNotification('This is an error message', ERROR)}>
          Show Error Notification
        </Button>
        <Button onClick={() => addNotification('This is an info message', INFO)}>
          Show Info Notification
        </Button>
      </div>
    </Layout>
  );
};

export default ToasterPage;
