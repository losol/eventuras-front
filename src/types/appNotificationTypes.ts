export const SUCCESS = 'success';
export const ERROR = 'error';
export const INFO = 'info';
export const APP_NOTIFICATION_TYPES = [SUCCESS, ERROR, INFO];

export interface AppNotification {
  id: string;
  message: string;
  type: string;
  expiresAfter?: number;
}
