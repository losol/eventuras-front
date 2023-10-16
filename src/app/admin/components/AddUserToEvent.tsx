import {
  EventDto,
  NewRegistrationDto,
  ProductDto,
  RegistrationType,
  UserDto,
} from '@losol/eventuras';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import DropdownSelect from '@/components/forms/DropdownSelect';
import { InputAutoComplete } from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import { AppNotificationType, useAppNotifications } from '@/hooks/useAppNotifications';
import { createEventRegistration } from '@/utils/api/functions/events';
import { getUsers } from '@/utils/api/functions/users';
import { mapEnum } from '@/utils/enum';

type AddUserToEventFormValues = {
  registrationType: string;
};

type AddUserCardProps = {
  user: UserDto;
  event: EventDto;
  onRemove: (u: UserDto) => void;
};
const AddUserCard: React.FC<AddUserCardProps> = ({ user, event, onRemove }) => {
  const { addAppNotification } = useAppNotifications();
  const { t: common } = useTranslation('common');

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<AddUserToEventFormValues>();

  useEffect(() => {
    setValue('registrationType', RegistrationType.PARTICIPANT); //default to participant
  }, []);

  const onSubmitForm = async (values: AddUserToEventFormValues) => {
    const newRegistration: NewRegistrationDto = {
      userId: user.id!,
      eventId: event.id!,
      type: values.registrationType as RegistrationType,
      createOrder: true,
      customer: {
        name: user.name,
        email: user.email,
      },
    };
    const result = await createEventRegistration(newRegistration);
    if (result.ok) {
      addAppNotification({
        id: Date.now(),
        message: 'User succesfully added to the event!',
        type: AppNotificationType.SUCCESS,
      });
      onRemove(user); //remove the card from the list of users to add
    } else {
      if (result.error.statusCode === 409) {
        addAppNotification({
          id: Date.now(),
          message: 'That user is already registered to the event',
          type: AppNotificationType.ERROR,
        });
        return;
      }
      addAppNotification({
        id: Date.now(),
        message: common('errors.fatalError.title'),
        type: AppNotificationType.ERROR,
      });
      throw new Error('Failed to add user to event');
    }
  };

  return (
    <form
      className="bg-slate-100 rounded-xl p-8 dark:bg-slate-700 m-4"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <Heading as="h4">User to add</Heading>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <DropdownSelect
        className="relative z-9"
        label="Registration Type"
        control={control}
        rules={{ required: 'Choose at least one Registration type for this User' }}
        name="registrationType"
        errors={errors}
        options={mapEnum(RegistrationType, (value: any) => ({
          id: value,
          label: value,
        }))}
        multiSelect={false}
      />
      <Button variant="light" type="submit">
        Add
      </Button>
      <Button
        variant="light"
        onClick={() => {
          onRemove(user);
        }}
      >
        Clear
      </Button>
    </form>
  );
};
export type AddUserToEventProps = {
  event: EventDto;
  eventProducts: ProductDto[];
};
const AddUserToEvent: React.FC<AddUserToEventProps> = ({ event }) => {
  const [usersToAdd, setUsersToAdd] = useState<UserDto[]>([]);
  return (
    <>
      <Heading as="h2">Add users to event </Heading>
      <InputAutoComplete
        id="find_user"
        placeholder="Find user"
        dataProvider={getUsers}
        minimumAmountOfCharacters={3}
        labelProperty="name"
        resetAfterSelect={true}
        onItemSelected={(u: UserDto) => {
          setUsersToAdd([...usersToAdd, u]);
        }}
      />
      {usersToAdd.map(user => (
        <AddUserCard
          user={user}
          event={event}
          key={user.id}
          onRemove={u => {
            setUsersToAdd([...usersToAdd].filter(us => u.id !== us.id));
          }}
        />
      ))}
    </>
  );
};

export default AddUserToEvent;
