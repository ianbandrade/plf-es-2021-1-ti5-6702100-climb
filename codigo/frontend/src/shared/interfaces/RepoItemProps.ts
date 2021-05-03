import Environment from "./environment";
import { IconType } from "react-icons/lib";

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
