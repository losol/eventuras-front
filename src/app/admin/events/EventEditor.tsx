'use client';
import {
  ApiError,
  EventDto,
  EventFormDto,
  EventInfoStatus,
  EventInfoType,
  Eventuras,
} from '@losol/eventuras';
import { useRouter } from 'next/navigation';
import createTranslation from 'next-translate/createTranslation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Checkbox, { CheckBoxLabel } from '@/components/forms/Checkbox';
import DropdownSelect from '@/components/forms/DropdownSelect';
import { InputDate, LegacyInputText } from '@/components/forms/Input';
import MarkdownEditView from '@/components/forms/MarkdownEditView';
import Button from '@/components/ui/Button';
import FatalError from '@/components/ui/FatalError';
import { apiWrapper, createSDK } from '@/utils/api/EventurasApi';
import { mapEnum } from '@/utils/enum';
import Environment from '@/utils/Environment';
import Logger from '@/utils/Logger';
import slugify from '@/utils/slugify';

const publishEvent = (formValues: EventFormDto, eventToUpdate: EventDto | null, sdk: Eventuras) => {
  const org = parseInt(Environment.NEXT_PUBLIC_ORGANIZATION_ID, 10);
  const values = {
    ...formValues,
    status: EventInfoStatus.REGISTRATIONS_OPEN,
  };
  if (eventToUpdate) {
    const updatedValues = {
      ...eventToUpdate,
      ...formValues,
    };

    return apiWrapper(() =>
      sdk.events.putV3Events({
        eventurasOrgId: org,
        id: eventToUpdate.id!,
        requestBody: updatedValues,
      })
    );
  }
  return apiWrapper(() => sdk.events.postV3Events({ eventurasOrgId: org, requestBody: values }));
};

export type EventEditorProps = {
  eventinfo: EventDto;
};

type ApiState = {
  event: EventDto | null;
  error: ApiError | null;
  loading: boolean;
};

const EventEditor = ({ eventinfo: eventinfo }: EventEditorProps) => {
  const { t } = createTranslation();
  const formHook = useForm<EventFormDto>();
  const {
    register,
    getValues,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = formHook;
  const sdk = createSDK({ inferUrl: { enabled: true, requiresToken: true } });

  const router = useRouter();
  const [apiState, setApiState] = useState<ApiState>({ event: null, error: null, loading: false });

  const fieldsetClassName = 'text-lg pt-3 pb-6';
  const fieldsetLegendClassName = 'text-lg border-b-2 pt-4 pb-2';

  const defaults: Map<string, string | boolean> = new Map();
  defaults.set('type', EventInfoType.COURSE);
  defaults.set('status', EventInfoStatus.DRAFT);
  defaults.set('featured', false);
  defaults.set('onDemand', false);
  defaults.set('published', false);

  useEffect(() => {
    if (eventinfo) {
      const keys = Object.keys(eventinfo) as Array<keyof typeof eventinfo | string>;
      keys.forEach((key: any) => {
        const acc = key as keyof typeof eventinfo;
        let val = eventinfo[acc];
        if (val === undefined || val === null) {
          val = defaults.get(key);
        }
        const k = key.toString();
        setValue(k, val);
      });
    }
  }, [eventinfo.id, setValue]);

  //## Form Handler - POST to create event

  const onSubmitForm: SubmitHandler<EventFormDto> = async (data: EventFormDto) => {
    setApiState({ ...apiState, loading: true });
    const result = await publishEvent(data, eventinfo, sdk);
    if (result.ok) {
      Logger.info({ namespace: 'admin:events' }, `On submit OK`, result.value);
      setApiState({ ...apiState, loading: false, event: result.value });
    } else {
      Logger.info({ namespace: 'admin:events' }, `On submit Error`, result.error);
      setApiState({ ...apiState, loading: false, error: result.error });
    }

    //## Result OK handling
    if (result && result.ok) {
      const nextUrl = `/admin/events/${result.value!.id}`;
      router.push(nextUrl);
    }
  };

  //## Result Error handling
  if (apiState.error) {
    const status = apiState.error.status;
    const statusText = apiState.error.statusText;
    if (status !== 409) {
      return (
        <FatalError
          title={t('common:errors.fatalError.title')}
          description={t('common:errors.fatalError.description')}
          additional={`${status}: ${statusText}`}
        />
      );
    }
  }

  //## Render
  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
      data-test-id="event-edit-form"
      data-event-id={eventinfo.id}
    >
      <fieldset disabled={apiState.loading} className={fieldsetClassName}>
        <legend className={fieldsetLegendClassName}>Overview</legend>
        <input
          type="hidden"
          value={Environment.NEXT_PUBLIC_ORGANIZATION_ID}
          {...register('organizationId')}
        />

        <LegacyInputText
          {...register('title', {
            required: 'Event title is required',
          })}
          label="Title"
          placeholder="Event Title"
          errors={errors}
        />
        <LegacyInputText
          {...register('headline')}
          label="Headline"
          placeholder="Event Headline"
          errors={errors}
        />
        <LegacyInputText
          {...register('category')}
          label="Category"
          placeholder="Event Category"
          errors={errors}
        />
        <DropdownSelect
          multiSelect={false}
          className="relative z-11 mb-4"
          label="Event Type"
          control={control}
          rules={{ required: 'An Event Type is required' }}
          name="type"
          errors={errors}
          options={mapEnum(EventInfoType, (value: any) => ({
            id: value,
            label: value,
          }))}
        />
        <DropdownSelect
          data-test-id="event-status-select"
          multiSelect={false}
          className="relative z-10 mb-4"
          label="Status"
          control={control}
          rules={{ required: 'Status is required' }}
          name="status"
          errors={errors}
          options={mapEnum(EventInfoStatus, (value: any) => ({
            id: value,
            label: value,
          }))}
        />
        <MarkdownEditView
          form={formHook}
          formName="description"
          options={{ required: 'Please provide a description of the event' }}
          placeholder="An Event Description here (markdown supported)"
          defaultValue={eventinfo.description ?? ''}
        />
        <LegacyInputText
          {...register('slug', {
            required: 'Slug is required',
          })}
          label="Slug"
          placeholder="Event Slug"
          errors={errors}
        />
        {eventinfo && (
          <div className="mb-4">
            <p>Event Dates</p>
            <div className="flex direction-row">
              <InputDate
                label="Start:"
                {...register('dateStart')}
                className="text-white bg-slate-700 p-2 m-2"
              />
              <InputDate
                label="End:"
                {...register('dateEnd')}
                className="text-white bg-slate-700 p-2 m-2"
              />
            </div>
            <InputDate
              label="Last Registration Date"
              {...register('lastRegistrationDate')}
              className="text-white bg-slate-700 p-2 m-2"
            />
          </div>
        )}
      </fieldset>
      <fieldset disabled={apiState.loading} className={fieldsetClassName}>
        <legend className={fieldsetLegendClassName}>Location</legend>
        <LegacyInputText {...register('city')} label="City" placeholder="City" errors={errors} />
        <LegacyInputText
          {...register('location')}
          label="Location"
          placeholder="Location"
          errors={errors}
        />
      </fieldset>
      <fieldset></fieldset>
      <fieldset disabled={apiState.loading} className={fieldsetClassName}>
        <legend className={fieldsetLegendClassName}>Image</legend>
        <LegacyInputText
          {...register('featuredImageUrl', {
            pattern: {
              value:
                /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
              message: 'Invalid url',
            },
          })}
          label="Image Url"
          placeholder="Image Url"
          errors={errors}
        />
        <LegacyInputText
          {...register('featuredImageCaption')}
          label="Image Caption"
          placeholder="Image Caption"
          errors={errors}
        />
      </fieldset>
      <fieldset>
        <legend className={fieldsetLegendClassName}>Additional Information</legend>
        <MarkdownEditView
          form={formHook}
          formName="program"
          label="Program"
          options={{ required: 'Please provide a program of the event' }}
          placeholder="An Event Program here (markdown supported)"
          defaultValue={eventinfo.program ?? ''}
        />
        <MarkdownEditView
          form={formHook}
          formName="practicalInformation"
          label="Practical Information"
          placeholder="Practical Information here (markdown supported)"
          options={{ required: 'Please provide a progrm of the event' }}
          defaultValue={eventinfo.practicalInformation ?? ''}
        />
        <MarkdownEditView
          form={formHook}
          formName="moreInformation"
          label="More Information"
          placeholder="More Information here (markdown supported)"
          defaultValue={eventinfo.moreInformation ?? ''}
        />
        <MarkdownEditView
          form={formHook}
          formName="welcomeLetter"
          label="Welcome Letter"
          placeholder="Welcome letter here (markdown supported)"
          defaultValue={eventinfo.welcomeLetter ?? ''}
        />
        <MarkdownEditView
          form={formHook}
          formName="informationRequest"
          label="Information Request"
          placeholder="Information Request (markdown supported)"
          defaultValue={eventinfo.informationRequest ?? ''}
        />
      </fieldset>
      <fieldset disabled={apiState.loading} className={fieldsetClassName}>
        <legend className={fieldsetLegendClassName}>Settings</legend>
        <div className="flex flex-row">
          <div className="mr-4">
            <Checkbox id="event-featured" {...register('featured')}>
              <CheckBoxLabel>Featured</CheckBoxLabel>
            </Checkbox>
          </div>
          <div className="mr-4">
            <Checkbox id="event-onDemand" {...register('onDemand')}>
              <CheckBoxLabel>On Demand</CheckBoxLabel>
            </Checkbox>
          </div>
          <div className="mr-4">
            <Checkbox
              id="event-published"
              {...register('published')}
              data-test-id="event-published-checkbox"
            >
              <CheckBoxLabel>Published</CheckBoxLabel>
            </Checkbox>
          </div>
        </div>
      </fieldset>
      {/* Additional Inputs */}
      <fieldset disabled={apiState.loading} className={fieldsetClassName}>
        <legend className={fieldsetLegendClassName}>Additional Fields</legend>

        {/* External Info Page URL */}
        <LegacyInputText
          {...register('externalInfoPageUrl')}
          label="External Info Page URL"
          placeholder="External Info Page URL"
          errors={errors}
        />

        {/* External Registrations URL */}
        <LegacyInputText
          {...register('externalRegistrationsUrl')}
          label="External Registrations URL"
          placeholder="External Registrations URL"
          errors={errors}
        />
        {/* Last Cancellation Date */}
        <InputDate
          label="Last Cancellation Date"
          {...register('lastCancellationDate')}
          className="text-white bg-slate-700 p-2 m-2"
        />

        {/* Max Participants */}
        <LegacyInputText
          {...register('maxParticipants')}
          label="Max Participants"
          type="number"
          placeholder="Max Participants"
          defaultValue={0}
          errors={errors}
        />

        {/* Certificate Title */}
        <LegacyInputText
          {...register('certificateTitle')}
          label="Certificate Title"
          placeholder="Certificate Title"
          errors={errors}
        />

        {/* Certificate Description */}
        <LegacyInputText
          {...register('certificateDescription')}
          label="Certificate Description"
          placeholder="Certificate Description"
          errors={errors}
        />
      </fieldset>
      <Button
        loading={apiState.loading}
        type="submit"
        onClick={() => {
          //slugify slug before submitting
          setValue('slug', slugify(getValues('slug')));
        }}
      >
        {t('common:buttons.submit')}
      </Button>
    </form>
  );
};
export default EventEditor;
