import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
  ) {
  }

  async github(code: string, state: string) {
    const accessToken = await this.getAccessToken('https://github.com/login/oauth/access_token', {
      client_id: this.configService.get<string>('versionControl.github.clientID'),
      client_secret: this.configService.get<string>('versionControl.github.clientSecret'),
      code,
    });

    return { state, accessToken };
  }

  async gitlab(code: string, state: string) {
    const accessToken = await this.getAccessToken('https://gitlab.com/oauth/token', {
      client_id: this.configService.get<string>('versionControl.gitlab.clientID'),
      client_secret: this.configService.get<string>('versionControl.gitlab.clientSecret'),
      redirect_uri: this.configService.get<string>('versionControl.gitlab.redirectURI'),
      grant_type: 'authorization_code',
      code,
    });

    return { state, accessToken };
  }

  private async getAccessToken(tokenURI: string, params: tokenParams): Promise<string> {
    const requestConfig = { params, headers: { accept: 'application/json' } };

    return this.httpService.post(tokenURI, null, requestConfig).toPromise()
      .then(response => response.data.access_token)
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }
}
