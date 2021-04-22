import { Organization } from "./Organization";

export interface GitProviders {
  github: Organization[] | null;
  gitlab: Organization[] | null;
}
