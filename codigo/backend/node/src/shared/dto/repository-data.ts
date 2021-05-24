import { User } from 'src/users/user.entity';

export class RepositoryData {
  repositoryOwner: string;
  repositoryName: string;
  repositoryRef: string;
  provider: string;
  user: User;
}
