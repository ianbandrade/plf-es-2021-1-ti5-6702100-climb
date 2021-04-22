import Environment from "./environment";
export interface CreateApplication {
  name: string;
  provider: string;
  repositoryId: number;
  repositoryRef: string;
  repositoryPath: string;
  repositoryURL: string;
  environments: Environment[];
}
