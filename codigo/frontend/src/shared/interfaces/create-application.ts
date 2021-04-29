import Environment from "./environment";
export interface CreateApplication {
  name: string;
  provider: string;
  repositoryId: string;
  repositoryRef: string;
  repositoryPath: string;
  repositoryURL: string;
  environments: Environment[];
  repositoryOwner: string;
  repositoryName: string;
}
