import React from 'react';
import { useRecoilValue } from 'recoil';

import { appNotificationState } from '@/atoms/RecoilState';
import AppNotifications from '@/components/feedback/AppNotifications';

const RecoilAppNotifications: React.FC = () => {
  const appNotifications = useRecoilValue(appNotificationState);

  return <AppNotifications appNotifications={appNotifications} />;
};

export default RecoilAppNotifications;
