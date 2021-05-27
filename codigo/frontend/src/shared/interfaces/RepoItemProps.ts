import { IconType } from "react-icons/lib";
import Environment from "./environment";

export module RepoItemProps {
  export interface Items {
    items: Application[];
  }

  export interface Application {
    id: string;
    name: string;
    repository: string;
    repositoryURL: string;
    repositoryName: string;
    repositoryOwner: string;
    provider: string;
    branch?: string;
    repositoryPath: string;
    environments: Environment[];
    userId: string;
    icon?: IconType;
  }

  export interface RootObject {
    applications: Application[];
  }
}
