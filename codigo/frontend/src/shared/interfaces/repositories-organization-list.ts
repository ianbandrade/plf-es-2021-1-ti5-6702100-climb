export interface RepositoriesList {
  organizations: {
    name: string;
    repositories: BasicRepository[];
  }[];
}

export interface BasicRepository {
  name: string;
  isEmpty: boolean;
}

export interface Repository {
  repositoryId: string;
  name: string;
  url: string;
  defaultBranch: string;
  branchs: string[];
}
