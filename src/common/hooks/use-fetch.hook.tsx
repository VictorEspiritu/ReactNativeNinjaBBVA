import { ApiStatus, useApiResponse } from "./use-response.hook.tsx";
import { useEffect, useState } from "react";

export interface FetchResponse<T> {
  status: ApiStatus;
  data: T;
  callApi: (url?: string) => void;
}

export function useFetch<T>(
  initialData: T,
  initialUrl?: string
): FetchResponse<T> {
  const [url, setUrl] = useState(initialUrl);
  const [apiStatus, fetchData] = useApiResponse(
    { isLoading: true, hasError: false },
    initialData
  );
  const [fetchedData, setFetchedData] = useState(initialData);

  let unmounted: boolean = false;

  function callApi(newUrl?: string): void {
    if (!unmounted) {
      setUrl(newUrl);
    }
  }

  useEffect(() => {
    (async (): Promise<void> => {
      if (!unmounted) {
        const data: T = await fetchData(unmounted, url);
        setFetchedData(data);
      }
    })();
  }, [url]);

  useEffect(() => {
    return (): void => {
      unmounted = true;
    };
  }, []);

  return { status: apiStatus, callApi, data: fetchedData };
}
