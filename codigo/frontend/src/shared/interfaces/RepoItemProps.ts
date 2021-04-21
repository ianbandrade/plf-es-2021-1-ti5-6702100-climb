import { IconType } from "react-icons/lib";

export module RepoItemProps {

    export interface Environment {
        key: string;
        value: string;
    }

    export interface Application {
        id: string;
        name: string;
        repository: string;
        url: string;
        provider: string;
        branch: string;
        path: string;
        environments: Environment[];
        icon?:IconType;
    }

    export interface RootObject {
        applications: Application[];
    }

}