import crypto from 'crypto';
import { useRecoilState } from 'recoil';

import { appNotificationState } from '@/atoms/RecoilState';
import { AppNotification } from '@/types/appNotificationTypes';

interface AddNotificationOptions {
  message: string;
  type: string;
  expiresAfter?: number;
}

export const useAppNotifications = () => {
  const [appNotifications, setAppNotifications] = useRecoilState(appNotificationState);

  const addAppNotification = (options: AddNotificationOptions) => {
    const { message, type, expiresAfter = 5000 } = options;
    const id = crypto.randomBytes(16).toString('hex');

    const newAppNotification: AppNotification = {
      id,
      message,
      type,
      expiresAfter,
    };

    setAppNotifications([...appNotifications, newAppNotification]);

    if (expiresAfter !== 0) {
      setTimeout(() => {
        setAppNotifications(appNotifications => appNotifications.filter(n => n.id !== id));
      }, expiresAfter);
    }
  };

  const removeAppNotification = (id: string) => {
    setAppNotifications(appNotifications => appNotifications.filter(n => n.id !== id));
  };

  return {
    appNotifications,
    addAppNotification,
    removeAppNotification,
  };
};
