import { atom } from 'recoil';

import { AppNotification } from '@/types/appNotificationTypes';

export const appNotificationState = atom<AppNotification[]>({
  key: 'appNotificationState',
  default: [],
});
