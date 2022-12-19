export interface Pull {
  id: number;
  number: number;
  title: string;
  user: User;
  commits_url: string;
}

interface User {
  login: string;
}