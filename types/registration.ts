import { EventPreviewType, UserType } from 'types';

// Partials
type EventIdType = number;
type UserIdType = number;

// Old name: UserEventRegistrationType
export type RegistrationForEventType = {
  eventId: EventIdType;
  userId: UserIdType;
};

export type RegistrationType = {
  registrationId: number;
  eventId: EventIdType;
  userId: UserIdType;
  status: string;
  type: string;
  certificateId: number;
  notes: string;
  user: UserType;
  event: EventPreviewType;
};
