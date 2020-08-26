import { useState } from 'react';

export interface ApiStatus {
  isLoading: boolean;
  hasError: boolean;
}

export function useApiResponse<T>(
  initialData: ApiStatus,
  defaultResponse: T
): [ApiStatus, (unmounted: boolean, url?: string, init?: RequestInit) => Promise<T>] {
  const [apiStatus, setApiStatus] = useState(initialData);

  async function handleFetchResponse(res: Response, unmounted: boolean): Promise<T> {
    if (unmounted) {
      return defaultResponse;
    }

    setApiStatus({ isLoading: false, hasError: !res.ok });
    return res.ok && res.json ? ((await res.json()) as T) : defaultResponse;
  }

  async function fetchData(unmounted: boolean, url?: string, init?: RequestInit): Promise<T> {
    try {
      if (url) {
        setApiStatus({ ...apiStatus, isLoading: true });
        const res: Response = await fetch(url, init);
        return await handleFetchResponse(res, unmounted);
      } else {
        setApiStatus({ ...apiStatus, isLoading: false });
      }

      return defaultResponse;
    } catch (error) {
      return await handleFetchResponse(error, unmounted);
    }
  }

  return [apiStatus, fetchData];
}
