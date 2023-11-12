'use client';
import createTranslation from 'next-translate/createTranslation';
import { useContext } from 'react';

import Link from '@/components/ui/Link';
import Loading from '@/components/ui/Loading';
import { UserContext } from '@/context/UserContext';
import { useUserEventRegistrations } from '@/hooks/apiHooks';

export type EventRegistrationButtonProps = {
  eventId: string | number;
};

export default function EventRegistrationButton({ eventId }: EventRegistrationButtonProps) {
  const { t } = createTranslation();
  const state = useContext(UserContext).userState;
  const profile = state.profile;
  const { loading, userRegistrations } = useUserEventRegistrations(profile?.id);
  let isRegistered = false;

  if (state.auth?.isAuthenticated) {
    if (loading) return <Loading />;
    isRegistered = userRegistrations.filter(reg => reg.eventId === eventId).length > 0;
  }

  return (
    <>
      {isRegistered ? (
        <div className="py-6 my-4">{t('common:registration.alreadyRegistered')}</div>
      ) : (
        <div className="my-4">
          <Link href={`/user/events/${eventId}/registration`} variant="button-primary" block data-test-id="event-registration-button">
            {t('common:buttons.register-cta')}
          </Link>
        </div>
      )}
    </>
  );
}
