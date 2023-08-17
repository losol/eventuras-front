import { RegistrationDto } from '@losol/eventuras';
import React from 'react';

interface UserRegistrationsProps {
  registrations: RegistrationDto[];
}

const UserRegistrations = (props: UserRegistrationsProps) => {
  return props.registrations.map((registration: RegistrationDto) => (
    <p key={registration.registrationId}>{registration.event?.title}</p>
  ));
};

export default UserRegistrations;
