import { useRecoilState } from 'recoil';

import { notificationState } from '@/atoms/RecoilState';
import { ERROR, INFO, SUCCESS } from '@/types/notificationTypes';

type NotificationType = typeof SUCCESS | typeof ERROR | typeof INFO;

export function useAddNotification() {
  const [notifications, setNotifications] = useRecoilState(notificationState);

  return (message: string, type: NotificationType) => {
    const newNotification = { message, type };
    setNotifications([...notifications, newNotification]);
  };
}
