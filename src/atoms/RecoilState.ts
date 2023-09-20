import { atom } from 'recoil';

import { NOTIFICATION_STATE_KEY } from './recoilKeys';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  message: string;
  type: NotificationType;
}

export const notificationState = atom<Notification[]>({
  key: NOTIFICATION_STATE_KEY,
  default: [],
});
