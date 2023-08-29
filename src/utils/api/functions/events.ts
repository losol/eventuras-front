import { EventDto } from '@losol/eventuras/models/EventDto';
import { EventFormDto } from '@losol/eventuras/models/EventFormDto';
import { NewRegistrationDto } from '@losol/eventuras/models/NewRegistrationDto';
import { ProductDto } from '@losol/eventuras/models/ProductDto';
import { RegistrationDto } from '@losol/eventuras/models/RegistrationDto';

import apiFetch from '../apiFetch';
import ApiResult from '../ApiResult';
import ApiURLs from '../ApiUrls';

const createEventRegistration = async (
  newRegistration: NewRegistrationDto,
  selectedProducts?: Map<string, number>
) => {
  const products = selectedProducts
    ? Array.from(selectedProducts, ([productId, quantity]) => ({
        productId,
        quantity,
      }))
    : [];

  const registration = apiFetch(ApiURLs.registrations, {
    method: 'POST',
    body: JSON.stringify(newRegistration),
  });

  if (!products.length) return registration;

  return registration.then(async (apiResult: ApiResult<RegistrationDto>) => {
    if (!apiResult.ok) {
      return apiResult;
    }
    const result: RegistrationDto = apiResult.value;
    const registrationId = result.registrationId!.toString();
    return await apiFetch(ApiURLs.products(registrationId), {
      method: 'POST',
      body: JSON.stringify({
        lines: products,
      }),
    });
  });
};
const createEvent = (formValues: EventFormDto): Promise<ApiResult<EventDto>> =>
  apiFetch(ApiURLs.events, { method: 'POST', body: JSON.stringify(formValues) });
const updateEvent = (eventId: string, formValues: EventFormDto): Promise<ApiResult<EventDto>> =>
  apiFetch(ApiURLs.event(eventId), { method: 'PUT', body: JSON.stringify(formValues) });
const getEvents = (): Promise<ApiResult<EventDto[]>> => apiFetch(ApiURLs.events);
const getEvent = (eventId: string): Promise<ApiResult<EventDto>> =>
  apiFetch(ApiURLs.event(eventId));
const getEventProducts = (eventId: string): Promise<ApiResult<ProductDto[]>> =>
  apiFetch(ApiURLs.eventProducts(eventId));

export { createEvent, createEventRegistration, getEvent, getEventProducts, getEvents, updateEvent };
