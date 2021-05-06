import {
  HttpService,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { User } from 'src/users/user.entity';
import { chunkArray } from 'src/shared/utils/arrays.util';
import {
  githubApiBaseUrl,
  gitlabApiBaseUrl,
} from 'src/shared/utils/version-control-services';

interface tokenParams {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri?: string;
  grant_type?: string;
}

@Injectable()
export class VersionControlService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async github(user: User, code: string) {
    await this.checkUser(user.id);

    const accessToken = await this.getAccessToken(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.configService.get<string>(
          'versionControl.github.clientID',
        ),
        client_secret: this.configService.get<string>(
          'versionControl.github.clientSecret',
        ),
        code,
      },
    );

    const githubUser = await this.getGitHubAccount(accessToken);

    await this.usersRepository.update(user.id, {
      image: githubUser.avatar_url,
      gitHubAccount: githubUser.login,
      gitHubToken: accessToken,
    });
  }

  async gitlab(user: User, code: string, redirectUrl: string) {
    await this.checkUser(user.id);

    const accessToken = await this.getAccessToken(
      'https://gitlab.com/oauth/token',
      {
        client_id: this.configService.get<string>(
          'versionControl.gitlab.clientID',
        ),
        client_secret: this.configService.get<string>(
          'versionControl.gitlab.clientSecret',
        ),
        redirect_uri: redirectUrl,
        grant_type: 'authorization_code',
        code,
      },
    );

    const gitlabUser = await this.getGitLabAccount(accessToken);

    await this.usersRepository.update(user.id, {
      image: user.image || gitlabUser.avatar_url,
      gitLabAccount: gitlabUser.username,
      gitLabToken: accessToken,
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  private async updateAccounts() {
    const allUsers = await this.usersRepository.find();
    const usersChunks = chunkArray(allUsers, 25);

    for (const users of usersChunks) {
      Promise.allSettled(
        users.map(async (user: User) => {
          const githubUser = await this.getGitHubAccount(user.gitHubToken);
          const gitlabUser = await this.getGitLabAccount(user.gitLabToken);

          this.usersRepository.update(user.id, {
            image: githubUser.image || gitlabUser.image,
            gitHubAccount: githubUser.login,
            gitLabAccount: gitlabUser.account,
          });
        }),
      );
    }
  }

  private async checkUser(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotAcceptableException(
        'Não foi possível identificar o usuário',
      );
    }
  }

  private async getAccessToken(
    tokenURI: string,
    params: tokenParams,
  ): Promise<string> {
    const requestConfig = { params, headers: { accept: 'application/json' } };

    return this.httpService
      .post(tokenURI, null, requestConfig)
      .toPromise()
      .then((response) => {
        const token = response.data?.access_token;
        if (!token) throw new Error();
        return token;
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Não foi possível receber o token do provedor',
        );
      });
  }

  private async getGitHubAccount(token: string) {
    return this.httpService
      .get(`${githubApiBaseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .toPromise()
      .then((response) => response.data)
      .catch(() => null);
  }

  private async getGitLabAccount(token: string) {
    return this.httpService
      .get(`${gitlabApiBaseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .toPromise()
      .then((response) => response.data)
      .catch(() => null);
  }
}
