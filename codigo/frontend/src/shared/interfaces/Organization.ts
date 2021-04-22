import { Repository } from "./Repository";

export interface Organization {
  name: string;
  repositories: Repository[];
}
