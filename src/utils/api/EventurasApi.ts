import { ApiError, ApiError as SDKError, CancelablePromise, Eventuras } from '@losol/eventuras';

import Environment from '../Environment';
import Logger from '../Logger';
type Headers = Record<string, string>;

type UrlInfer = {
  enabled: boolean;
  requiresToken?: boolean | null;
};
interface SDKOptions {
  baseUrl?: string;
  authHeader?: string | null;
  inferUrl?: UrlInfer | boolean | null;
}

export class ApiResult<T = void, E = ApiError> {
  private _isSuccess: boolean;
  private okResult: T | null;
  private errorResult: E | null;

  constructor(isSuccess: boolean, _okResult: T | null, _errResult: E | null) {
    this._isSuccess = isSuccess;
    this.okResult = _okResult;
    this.errorResult = _errResult;
  }

  public get ok(): boolean {
    return this._isSuccess;
  }

  get value(): T | null {
    return this.okResult!;
  }

  get error(): E | null {
    return this.errorResult!;
  }
}

export const apiWrapper = <T>(fetchFunction: () => CancelablePromise<T>) =>
  fetchFunction()
    .then(body => new ApiResult<T, ApiError>(true, body, null))
    .catch((err: SDKError) => {
      //500 errors will be thrown and should be caught top level and dealt with(or default nextjs 500 result)
      if (err.status >= 500) {
        throw err;
      }
      //any other errors should be dealt with by the callee
      return new ApiResult<T, ApiError>(false, null, err);
    });

export const createSDK = ({ baseUrl, authHeader, inferUrl }: SDKOptions = {}): Eventuras => {
  const orgId: string = Environment.NEXT_PUBLIC_ORGANIZATION_ID;
  const apiVersion = Environment.NEXT_PUBLIC_API_VERSION;
  let token: string | undefined | null;

  if (authHeader) {
    token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  }
  let apiBaseUrl: string = authHeader
    ? Environment.NEXT_PUBLIC_BACKEND_URL
    : Environment.NEXT_PUBLIC_API_BASE_URL;
  if (baseUrl) {
    apiBaseUrl = baseUrl;
  } else if (inferUrl) {
    const requiresToken = (inferUrl as UrlInfer).requiresToken;
    if (!requiresToken || Environment.NEXT_IN_PHASE_PRODUCTION_BUILD) {
      //when we are building, the router is not available, use direct url instead, tokenless
      apiBaseUrl = Environment.NEXT_PUBLIC_BACKEND_URL;
    } else if (!token) {
      apiBaseUrl = Environment.NEXT_PUBLIC_API_BASE_URL;
    }
  }
  Logger.info(
    { namespace: 'api' },
    {
      apiBaseUrl,
      baseUrl,
      authHeader,
      inferUrl,
      building: Environment.NEXT_IN_PHASE_PRODUCTION_BUILD,
    }
  );
  const headers: Headers = {
    'Eventuras-Org-Id': orgId,
  };

  const config: {
    BASE: string;
    TOKEN?: string;
    HEADERS?: Headers | undefined;
    VERSION: string;
  } = {
    BASE: apiBaseUrl,
    TOKEN: token ?? undefined,
    HEADERS: headers,
    VERSION: apiVersion,
  };
  if (token) {
    config.TOKEN = token;
  }

  return new Eventuras(config);
};
