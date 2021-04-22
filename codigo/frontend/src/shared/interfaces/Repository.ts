export interface Repository {
  repositoryId: string;
  name: string;
  url: string;
  defaultBranch: string;
  branchs: string[];
}

export interface BasicRepository {
  name: string;
  isEmpty: boolean;
}

export interface RepositoriesList {
  organizations: {
    name: string;
    repositories: BasicRepository[];
  }[];
}
