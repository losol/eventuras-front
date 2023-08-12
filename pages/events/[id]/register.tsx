import RegistrationComplete from 'components/event/register-steps/RegistrationComplete';
import RegistrationCustomize from 'components/event/register-steps/RegistrationCustomize';
import RegistrationPayment, {
  PaymentFormValues,
} from 'components/event/register-steps/RegistrationPayment';
import { Loading } from 'components/feedback';
import { Layout } from 'components/layout';
import createEventRegistration from 'helpers/createEventRegistration';
import { mapEventProductsToView } from 'helpers/modelviewMappers';
import useEventProducts from 'hooks/useEventProducts';
import useMyUserProfile from 'hooks/useMyUserProfile';
import { useRouter } from 'next/router';
import { useState } from 'react';

type PageStep = 'Customize' | 'Payment' | 'Complete' | 'Error';

const throwUserNotFoundError = () => {
  throw new Error(
    'event/register: User profile is not supposed to be null when registring for an event'
  );
};

const EventRegistration = () => {
  let selectedProducts: Map<string, number> = new Map();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<PageStep>('Customize');
  const eventId = parseInt(router.query.id as string, 10);
  const { userProfile, loading: loadingUser } = useMyUserProfile();
  const { registrationProducts, loading: loadingRegistrationProducts } = useEventProducts(eventId);

  const onCustomize = (selected: Map<string, number>) => {
    console.log({ selectedProducts });
    selectedProducts = selected;
    setCurrentStep('Payment');
  };

  const onPayment = async (formValues: PaymentFormValues) => {
    console.log(formValues);
    if (!userProfile) {
      throwUserNotFoundError();
      return;
    }
    const result = await createEventRegistration(
      userProfile.id,
      eventId,
      formValues,
      selectedProducts
    );
    if (result.success === false) {
      //TODO unhappy flow
      setCurrentStep('Error');
    }
    setCurrentStep('Complete');
  };

  const onCompleteFlow = () => {
    console.log('done');
    router.push('/');
  };

  if (loadingRegistrationProducts || loadingUser) return <Loading />;
  if (!userProfile) {
    throwUserNotFoundError();
    return;
  }
  if (currentStep === 'Customize' && registrationProducts.length === 0) {
    //no need to customize order when there are no options, let's go straight to payment
    setCurrentStep('Payment');
  }

  const renderStep = (step: PageStep) => {
    switch (step) {
      case 'Customize':
        return (
          <RegistrationCustomize
            products={mapEventProductsToView(registrationProducts)}
            onSubmit={onCustomize}
          />
        );
      case 'Payment':
        return <RegistrationPayment onSubmit={onPayment} userProfile={userProfile} />;
      case 'Complete':
        return <RegistrationComplete onSubmit={onCompleteFlow} />;
      case 'Error':
        return <p>OOps, something went wrong</p>;
    }
  };

  return <Layout>{renderStep(currentStep)}</Layout>;
};

export default EventRegistration;