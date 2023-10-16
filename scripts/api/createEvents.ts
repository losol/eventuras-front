import Environment from '@/utils/Environment';
import { createEvent, createProduct } from '@/utils/api/functions/events';
import slugify from '@/utils/slugify';
import { randNumber, randTextRange } from '@ngneat/falso';
import dotenv from 'dotenv';
import { EventFormDto, EventInfoStatus, NewProductDto } from 'scripts/api/eventuras';
import { ProductVisibility } from './eventuras/models/ProductVisibility';

/**
 * To make this work copy @node_modules/losol/eventuras to scripts/api/eventuras
 * This is run through ts-node which ignores typescript files in the node_modules directory, throwing an error instead.
 *
 * Also make sure to put a valid access token in your .env file
 * MOCK_ACCESS_TOKEN=eyAbCdeFghI.... etc
 */
dotenv.config();
Environment.validate();
process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.eventuras.losol.io';

const eventBody = (): EventFormDto => {
  const title = randTextRange({ min: 10, max: 30 });
  const slug = slugify(title);
  return {
    title,
    slug,
    organizationId: 1,
    status: EventInfoStatus.REGISTRATIONS_OPEN,
  };
};

const productBody = (): NewProductDto => {
  return {
    name: randTextRange({ min: 10, max: 30 }),
    price: randNumber({ min: 1, max: 90 }),
    vatPercent: 10,
    visibility: ProductVisibility.EVENT,
  };
};

const createRandomEvents = async (withProducts = true) => {
  const init = {
    headers: {
      Authorization: `Bearer ${process.env.MOCK_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const evBody = eventBody();
  const result = await createEvent(evBody, init);
  if (result.ok) {
    console.log(result.value);
    const product = productBody();
    const product2 = productBody();
    const res = await createProduct(result.value.id?.toString()!, product, init);
    const res2 = await createProduct(result.value.id?.toString()!, product2, init);
    console.log(res);
    console.log(res2);
  } else {
    console.log(result.error.statusCode, result.error.statusText, result.error);
  }
};
createRandomEvents();
