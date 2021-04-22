export interface Repository {
  repositoryId: number;
  name: string;
  url: string;
  defaultBranch: string;
  branchs: string[];
  isEmpty?: boolean;
}

export interface BasicRepository {
  name: string;
  isEmpty: boolean;
}
