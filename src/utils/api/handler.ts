import Logger from '../Logger';
import ApiError from './ApiError';

type StatusMap = {
  [status: number]: (response: Response) => Promise<any | string>;
};

const safeParse = async (response: Response, parseAsJson: boolean) => {
  let parsedResponse = null;
  try {
    parsedResponse = parseAsJson ? response.json() : response.text();
  } catch (error) {
    Logger.error({ namespace: 'api' }, 'Trouble parsing result ', {
      statusCode: response.status,
      parseAsJson,
      error,
    });
  }
  return parsedResponse;
};

const statusMapper = {
  200: (response: Response) => safeParse(response, true),
  204: (response: Response) => safeParse(response, false),
  400: (response: Response) => {
    throw new ApiError({
      message: 'Api invalid request',
      statusCode: response.status,
      statusText: response.statusText,
    });
  },
  500: (response: Response) => {
    throw new ApiError({
      message: 'Api fatal error',
      statusCode: response.status,
      statusText: response.statusText,
    });
  },
} as StatusMap;

const handler = (response: Response): Promise<any | string> => {
  const func = statusMapper[response.status];
  switch (true) {
    case func !== null && typeof func === 'function':
      return func(response);
    case response.status > 200 && response.status < 300:
      return statusMapper[204](response);
    case response.status >= 400 && response.status < 500:
      return statusMapper[400](response);
    case response.status >= 500:
      return statusMapper[500](response);
    default:
      throw new ApiError({
        message: 'Unable to handle API response',
        statusCode: -1,
        statusText: "Api handler wasn't able to handle request",
      });
  }
};

export default handler;
