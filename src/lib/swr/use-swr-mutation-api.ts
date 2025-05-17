import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

// Define HTTP methods
type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

// Configuration interface
interface UseSWRMutationAPIConfig<TBody, TData> {
  method: HttpMethod;
  revalidateKeys?: string[]; // SWR keys to revalidate after mutation
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

// Generic fetcher function
const fetcher = async <TData, TBody>(
  url: string,
  {
    arg,
  }: { arg: { body?: TBody; config: UseSWRMutationAPIConfig<TBody, TData> } }
): Promise<TData> => {
  const { body } = arg;
  const { method } = arg.config;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
  }

  const result = await response.json();

  return result as TData;
};

// Custom hook
export function useSWRMutationAPI<TData = any, TBody = any>(
  url: string,
  config: UseSWRMutationAPIConfig<TBody, TData>
) {
  const { revalidateKeys = [], onSuccess, onError } = config;

  const { trigger, isMutating, data, error } = useSWRMutation<
    TData,
    Error,
    string | null,
    { body?: TBody; config: UseSWRMutationAPIConfig<TBody, TData> }
  >(url, (url, { arg }) => fetcher<TData, TBody>(url, { arg }), {
    onSuccess: (data) => {
      // Revalidate other SWR keys
      revalidateKeys.forEach((key) => mutate(key));

      if (onSuccess) onSuccess(data);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });

  return {
    trigger: (body?: TBody) => trigger({ body, config }),
    isMutating,
    data,
    error,
  };
}
