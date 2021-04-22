import { Repository, BasicRepository } from "./Repository";

export interface Organization {
  name: string;
  repositories: BasicRepository[] | Repository[];
}
