export interface Repository {
  repositoryId?: number;
  name: string;
  url?: string;
  defaultBranch?: string;
  branchs?: string[];
  isEmpty: boolean;
}
