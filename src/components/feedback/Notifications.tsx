import React from 'react';
import { useRecoilValue } from 'recoil';

import { notificationState } from '@/atoms/RecoilState';
import { Portal } from '@/components/layout';

const Notifications: React.FC = () => {
  const notifications = useRecoilValue(notificationState);

  return (
    <div>
      <Portal isOpen={notifications.length > 0}>
        <div className="fixed bottom-0 right-0 z-50 p-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`m-2 p-4 rounded shadow-lg 
                            ${
                              notification.type === 'success'
                                ? 'bg-green-500 text-white'
                                : notification.type === 'error'
                                ? 'bg-red-500 text-white'
                                : 'bg-blue-500 text-white'
                            }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </Portal>
    </div>
  );
};

export default Notifications;
