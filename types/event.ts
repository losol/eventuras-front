import { EVENT_STATUS, EVENT_TYPE } from 'const';

type ValueOf<T> = T[keyof T];

// Partials
export type EventStatusType = ValueOf<typeof EVENT_STATUS>;
export type EventTypeType = ValueOf<typeof EVENT_TYPE>;

// Event Preview (card)
export type EventPreviewType = {
  category: string | null;
  city: string | null;
  dateEnd: string | null;
  dateStart: string;
  description: string;
  featured: boolean;
  id: number;
  lastRegistrationDate: string | null;
  location: string | null;
  onDemand: boolean;
  practicalInformation: string | null;
  program: string | null;
  slug: string;
  status: EventStatusType;
  title: string;
  type: EventTypeType;
};
