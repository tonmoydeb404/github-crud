import { useSWRAPI } from "@/lib/swr/use-swr-api";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { SWRConfiguration } from "swr";

export type TRepositoriesQuery = {
  page: number;
  per_page: number;
};

export const useRepositories = (
  query: TRepositoriesQuery,
  config: SWRConfiguration = {}
) => {
  return useSWRAPI<
    RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]
  >(`/api/repositories?page=${query.page}&per_page=${query.per_page}`, config);
};
