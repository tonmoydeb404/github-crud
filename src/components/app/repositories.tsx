"use client";

import { TRepositoriesQuery, useRepositories } from "@/hooks/use-repositories";
import { useState } from "react";
import { Button } from "../ui/button";

export default function RepoList() {
  const [queries, setQueries] = useState<TRepositoriesQuery>({
    page: 1,
    per_page: 10,
  });
  const { data, isLoading, error } = useRepositories(queries);

  console.log(data);

  if (isLoading) return <p>Loading repositories...</p>;
  if (!!error) return <p>Failed to load repositories.</p>;

  return (
    <div>
      <ul className="space-y-2 mb-5">
        {data?.data.map((repo) => (
          <li key={repo.id} className="border p-2 rounded">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.full_name}
            </a>
            {repo.description && (
              <p className="text-sm text-gray-500">{repo.description}</p>
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <Button
          onClick={() =>
            setQueries((prev) => ({ ...prev, page: prev.page - 1 }))
          }
          disabled={queries.page <= 1}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setQueries((prev) => ({ ...prev, page: prev.page + 1 }))
          }
          disabled={
            !data?.data.length ||
            (Array.isArray(data?.data) && data.data.length < queries.per_page)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
