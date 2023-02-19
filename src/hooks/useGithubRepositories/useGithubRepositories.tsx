import { useCallback, useEffect, useState } from "react";
import { IGithubRepository } from "../../types/IGithubRepository";

type Props = {
  org: string;
};

export default function useGithubRepositories({ org }: Props) {
  const [repos, setRepos] = useState<IGithubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(() => {
    fetch(`https://api.github.com/orgs/${org}/repos`)
      .then((r) => r.json())
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { repos, isLoading, error, refetch: fetcher };
}
