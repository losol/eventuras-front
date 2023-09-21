import { atom } from 'recoil';

import { AppNotification } from '@/components/feedback/AppNotifications';

export const appNotificationState = atom<AppNotification[]>({
  key: 'appNotificationState',
  default: [],
});
