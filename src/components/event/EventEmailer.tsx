import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import MarkdownEditor from '../inputs/MarkdownEditor';
import { Button } from '../inputs';
import { blueBlockClasses } from '../inputs/Button';
import { InputText, defaultInputStyle, lightInputStyle } from '../inputs/Input';
import MultiSelectDropdown from '../inputs/MultiSelectDropdown';
import { RegistrationStatus, RegistrationType } from '@losol/eventuras';
import {mapEnum} from '@/utils/enum'

type EventEmailerFormValues = {
  subject: string;
  body: string;
  registrationStatus:Array<string>
};

export type EventEmailerProps = {
  eventTitle: string;
  eventId: number;
};

const onSubmitForm: SubmitHandler<EventEmailerFormValues> = async (
  data: EventEmailerFormValues
) => {
  console.log({ data });
};

export default function EventEmailer({ eventTitle, eventId }: EventEmailerProps) {
  const {
    register,
    getValues,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EventEmailerFormValues>();

  return (
    <form className="text-black bg-white" onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <label htmlFor="eventTitle">Event</label>
        <p id="eventTitle">{eventTitle}</p>
      </div>
      <div className='relative z-10'>
        <label htmlFor="statusSelector">Status</label>
        <Controller
        control={control}
        name="registrationStatus"
        rules={{ required: 'Please Select at least one Status option' }}
        render={({ field: { onChange, onBlur, value, ref } }) => {
    
          return(
          <MultiSelectDropdown id="statusSelector" options={mapEnum(RegistrationStatus,(value:any,i:number)=>({id:i,label:value}))} 
          onChange={onChange}
          onBlur={onBlur}
          selected={value ?? []}
          />
        )}}
      />
       {errors['registrationStatus'] && (
        <label htmlFor="registrationStatus" role="alert" className="text-red-500">
          {errors['registrationStatus']?.message}
        </label>
      )}
      </div>
      <div className='relative z-9'>
        <label htmlFor="typeSelector">Type</label>
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
        <Button className={`flex-auto justify-center m-1 ${blueBlockClasses}`} type="submit">
          Send
        </Button>
        <Button
          onClick={e => {
            e.preventDefault();
          }}
          className={`flex-auto justify-center m-1m ${blueBlockClasses}`}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
