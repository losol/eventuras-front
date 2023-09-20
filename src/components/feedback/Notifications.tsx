import React from 'react';
import { useRecoilValue } from 'recoil';

import { appNotificationState } from '@/atoms/RecoilState';
import { Portal } from '@/components/layout';

const AppNotifications: React.FC = () => {
  const appNotifications = useRecoilValue(appNotificationState);

  return (
    <div>
      <Portal isOpen={appNotifications.length > 0}>
        <div className="fixed bottom-0 right-0 z-50 p-4">
          {appNotifications.map(appNotifications => (
            <div
              key={appNotifications.id}
              className={`m-2 p-4 rounded shadow-lg 
                            ${
                              appNotifications.type === 'success'
                                ? 'bg-green-500 text-white'
                                : appNotifications.type === 'error'
                                ? 'bg-red-500 text-white'
                                : 'bg-blue-500 text-white'
                            }`}
            >
              {appNotifications.message}
            </div>
          ))}
        </div>
      </Portal>
    </div>
  );
};

export default AppNotifications;
