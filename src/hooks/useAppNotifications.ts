import { useRecoilState } from 'recoil';

import { appNotificationState } from '@/atoms/RecoilState';
import { AppNotification } from '@/components/feedback/AppNotifications';

export { AppNotificationType } from '@/components/feedback/AppNotifications';

export const useAppNotifications = () => {
  const [appNotifications, setAppNotifications] = useRecoilState(appNotificationState);

  const addAppNotification = (options: AppNotification) => {
    const { id, message, type, expiresAfter = 5000 } = options;

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

  const removeAppNotification = (id: number) => {
    setAppNotifications(appNotifications => appNotifications.filter(n => n.id !== id));
  };

  return {
    appNotifications,
    addAppNotification,
    removeAppNotification,
  };
};
