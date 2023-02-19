import { useState, useEffect } from "react";

type RepositoryState = {
  id: number;
  liked: boolean;
};

export default function useRepositoryLikeManagement() {
  const [repositoryLikes, setRepositoryLikes] = useState<RepositoryState[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem("repositoryLikes");

    if (storage) {
      setRepositoryLikes(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (repositoryLikes.length === 0) return;

    localStorage.setItem("repositoryLikes", JSON.stringify(repositoryLikes));
  }, [repositoryLikes]);

  function toggleLike(id: number) {
    setRepositoryLikes((prevState) => {
      const exists = prevState.find((r) => r.id === id);

      if (exists) {
        return prevState.map((r) =>
          r.id === id ? { ...r, liked: !r.liked } : r
        );
      }

      return [...prevState, { id, liked: true }];
    });
  }

  return { repositoryLikes, toggleLike };
}
