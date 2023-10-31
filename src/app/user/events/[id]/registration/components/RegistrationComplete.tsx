import useTranslation from 'next-translate/useTranslation';

import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';

export type RegistrationCompleteProps = {
  onSubmit: () => void;
};
const RegistrationComplete = ({ onSubmit }: RegistrationCompleteProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Heading>{t('register:complete.title')}</Heading>
      <p>{t('register:complete.description')}</p>
      <Button onClick={() => onSubmit()}>Continue</Button>
    </>
  );
};

export default RegistrationComplete;
