export interface IGithubRepository {
  id: number;
  full_name: string;
  owner: {
    login: string;
  };
}
