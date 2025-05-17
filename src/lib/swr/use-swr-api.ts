import useSWR, { SWRConfiguration, SWRResponse } from "swr";

async function fetcher<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Fetch error (${response.status}): ${text}`);
  }
  return response.json();
}

export function useSWRAPI<T = any>(
  endpoint: string,
  config: SWRConfiguration = {}
) {
  const swr: SWRResponse<T, Error> = useSWR<T, Error>(endpoint, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...config,
  });

  return swr;
}
