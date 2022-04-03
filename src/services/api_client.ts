type Query = Record<string, any>;

type RestApiValidationError = {
  value: string;
  msg: string;
}

export interface RestApiError extends Error {
  data?: RestApiValidationError[];
}

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  query?: Query,
  body?: any,
  headers?: Record<string, string>,
}

interface AuthRequestOptions extends RequestOptions {
  accessToken: string,
}

abstract class ApiClient {
  baseUrl!: string;

  /**
   * Converts `Query` object to match the type of `URLSearchParams`.
   */
  getQueryObject = (query?: Query): Record<string, string> => Object.entries(query ?? {})
    .reduce((entries, entry) => ({
      ...entries, [entry[0].toString()]: entry[1],
    }), {});

  getUrl = (resourceUrl: string) => new URL(resourceUrl, this.baseUrl).href;

  async request<T>(options: RequestOptions) {
    const querySearch = new URLSearchParams(this.getQueryObject(options.query));
    const url = this.getUrl(options.url) + (options.query ? `?${querySearch}` : '');

    const response = await fetch(url, {
      method: options.method,
      body: options.body ? JSON.stringify(options.body) : options.body,
      headers: { ...options.headers, 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) return data as T;

    const error: RestApiError = new Error();
    error.data = data;
    throw error;
  }

  async authorizedRequest<T>(options: AuthRequestOptions) {
    return this.request<T>({
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${options.accessToken}` },
    });
  }
}

export default ApiClient;
