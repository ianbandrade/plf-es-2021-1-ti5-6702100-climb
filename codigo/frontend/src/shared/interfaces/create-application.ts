import Enviroment from "./enviroment";
export interface CreateApplication {
  name: string;
  provider: string;
  repositoryId: number;
  repositoryRef: string;
  repositoryPath: string;
  repositoryUrl: string;
  enviroments: Enviroment[];
}
