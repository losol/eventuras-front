import { EmailNotificationDto, RegistrationStatus, RegistrationType } from '@losol/eventuras';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { AppNotificationType, useAppNotifications } from '@/hooks/useAppNotifications';
import { sendEmailNotification } from '@/utils/api/functions/notifications';
import { mapEnum } from '@/utils/enum';

import Heading from '../content/Heading';
import { Button } from '../inputs';
import { InputText, lightInputStyle } from '../inputs/Input';
import MarkdownEditor from '../inputs/MarkdownEditor';
import MultiSelectDropdown from '../inputs/MultiSelectDropdown';

type EventEmailerFormValues = {
  subject: string;
  body: string;
  registrationStatus: Array<string>;
  registrationTypes: Array<string>;
};

export type EventEmailerProps = {
  eventTitle: string;
  eventId: number;
  onClose: () => void;
};

export default function EventEmailer({ eventTitle, eventId, onClose }: EventEmailerProps) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EventEmailerFormValues>();
  const { addAppNotification } = useAppNotifications();

  const onSubmitForm: SubmitHandler<EventEmailerFormValues> = async (
    data: EventEmailerFormValues
  ) => {
    const body: EmailNotificationDto = {
      subject: data.subject,
      bodyMarkdown: data.body,
      eventParticipants: {
        eventId,
        registrationStatuses: data.registrationStatus as unknown as RegistrationStatus[],
        registrationTypes: data.registrationTypes as unknown as RegistrationType[],
      },
    };
    const result = await sendEmailNotification(body);
    if (!result.ok) {
      addAppNotification({
        id: Date.now(),
        message: 'Something went wrong, please try again later',
        type: AppNotificationType.ERROR,
      });
    } else {
      addAppNotification({
        id: Date.now(),
        message: 'Success! The email notification was sent successfully',
        type: AppNotificationType.SUCCESS,
      });
      //we are done, lets request a close
      onClose();
    }
  };

  return (
    <form className="text-black" onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <Heading as="h4">Event</Heading>
        <p>{eventTitle}</p>
      </div>
      <div className="relative z-10">
        <label htmlFor="statusSelector">Status</label>
        <Controller
          control={control}
          name="registrationStatus"
          rules={{ required: 'Please Select at least one Status option' }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MultiSelectDropdown
                id="statusSelector"
                options={mapEnum(RegistrationStatus, (value: any) => ({ id: value, label: value }))}
                onChange={onChange}
                onBlur={onBlur}
                selected={value ?? []}
              />
            );
          }}
        />
        {errors['registrationStatus'] && (
          <label htmlFor="registrationStatus" role="alert" className="text-red-500">
            {errors['registrationStatus']?.message}
          </label>
        )}
      </div>
      <div className="relative z-9">
        <label htmlFor="typeSelector">Type</label>
        <Controller
          control={control}
          name="registrationTypes"
          rules={{ required: 'Please Select at least one Type option' }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MultiSelectDropdown
                id="typeSelector"
                options={mapEnum(RegistrationType, (value: any) => ({ id: value, label: value }))}
                onChange={onChange}
                onBlur={onBlur}
                selected={value ?? []}
              />
            );
          }}
        />
        {errors['registrationTypes'] && (
          <label htmlFor="registrationTypes" role="alert" className="text-red-500">
            {errors['registrationTypes']?.message}
          </label>
        )}
      </div>
      <div>
        <InputText
          {...register('subject', {
            required: 'Email subject is required',
          })}
          label="Subject"
          placeholder="Subject"
          errors={errors}
          className={`${lightInputStyle}`}
        />
      </div>
      <div>
        <div id="bodyEditor">
          <MarkdownEditor
            {...register('body', {
              required: 'Email body is required',
            })}
            label="Body"
            placeholder="Email Body"
            className={`${lightInputStyle}`}
            errors={errors}
          />
        </div>
      </div>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <Button className={`flex-auto justify-center m-1`} type="submit" variant="outline">
          Send
        </Button>
        <Button
          onClick={e => {
            onClose();
            e.preventDefault();
          }}
          variant="outline"
          className={`flex-auto justify-center m-1m`}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
