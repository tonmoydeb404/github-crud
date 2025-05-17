import { useRepositoryCreate } from "@/hooks/use-repositories";
import React from "react";
import { Button } from "../ui/button";

const CreateForm = () => {
  const [repoName, setRepoName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const {
    trigger,
    isMutating,
    error: mutationError,
    data,
  } = useRepositoryCreate();

  React.useEffect(() => {
    if (mutationError) {
      setError(mutationError.message);
    }
  }, [mutationError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!repoName.trim()) {
      setError("Repository name is required.");
      return;
    }

    try {
      await trigger({ name: repoName });
      // Optional: reset input or redirect
      setRepoName("");
      alert("Repository created successfully!");
    } catch (err) {
      // Error already handled via setError above
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mb-5 border p-5 rounded-2xl bg-accent"
    >
      <div>
        <label htmlFor="repo-name" className="block text-sm font-medium mb-1">
          Repository Name
        </label>
        <input
          id="repo-name"
          type="text"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="Enter repository name"
          disabled={isMutating}
          className="w-full px-3 py-2 border rounded-md shadow-sm bg-card focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {data && <p className="text-green-600">✅ Created: {repoName}</p>}

      <Button type="submit" disabled={isMutating} variant={"default"}>
        {isMutating ? "Creating..." : "Create Repository"}
      </Button>
    </form>
  );
};

export default CreateForm;
