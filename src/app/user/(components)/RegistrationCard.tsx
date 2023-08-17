import { RegistrationDto } from '@losol/eventuras';

const RegistrationCard = (registrationDto: RegistrationDto) => {
  return (
    <div>
      <h1>RegistrationCard</h1>
      <p>{registrationDto.event?.title}</p>
      <p>{registrationDto.eventId}</p>
      <p>{registrationDto.userId}</p>
      <p>{registrationDto.status}</p>
    </div>
  );
};

export default RegistrationCard;
