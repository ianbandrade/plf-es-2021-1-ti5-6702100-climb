import { ConfigService } from '@nestjs/config';
import {
  HttpService,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { MonitorNewDataDto } from './dto/monitoring/monitorData.dto';

@Injectable()
export class MonitoringService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getDashboards(appName: string): Promise<MonitorNewDataDto> {
    const queries = [
      {
        name: 'openConnections',
        value: `sum(label_replace(traefik_service_open_connections{exported_service=~"\\\\w+-(${appName})-.+"}, "app", "$1", "exported_service", "\\\\w+-(.+)-\\\\w+@\\\\w+"))`,
      },
      {
        name: 'responseStatusCode',
        value: `sum by(statusCode) (label_replace(label_replace(round(increase(traefik_service_requests_total{exported_service=~"\\\\w+-(${appName})-.+", code=~"(2|4|5)\\\\d\\\\d"}[5m])), "app", "$1", "exported_service", "\\\\w+-(.+)-\\\\w+@\\\\w+"), "statusCode", "\${1}XX", "code", "(\\\\d)\\\\d\\\\d"))`,
      },
      {
        name: 'averageRequestTime',
        value: `sum by(method) (label_replace(rate(traefik_service_request_duration_seconds_sum{exported_service=~"\\\\w+-(${appName})-.+", method=~"GET|POST|PUT|PATCH|DELETE"}[5m]), "app", "$1", "exported_service", "\\\\w+-(.+)-\\\\w+@\\\\w+")) / sum by(method) (label_replace(rate(traefik_service_request_duration_seconds_count{exported_service=~"\\\\w+-(${appName})-.+", method=~"GET|POST|PUT|PATCH|DELETE"}[5m]), "app", "$1", "exported_service", "\\\\w+-(.+)-\\\\w+@\\\\w+")) * 1000`,
      },
    ];

    const requests = queries.map(async (query) => [
      query.name,
      await this.getMetrics(query.value),
    ]);

    const responses = await Promise.all(requests);
    return {
      results: Object.fromEntries(responses),
    };
  }

  private async getMetrics(query: string): Promise<any> {
    const requestConfig = { params: { query } };

    return this.httpService
      .get(
        `http://${this.configService.get<string>('prometheusHost')}/api/v1/query`,
        requestConfig,
      )
      .toPromise()
      .then((response) => response.data.data.result)
      .catch(() => {
        throw new InternalServerErrorException('Erro na requisição');
      });
  }

  private socketClientMap = new Map<
    string,
    { subject: BehaviorSubject<MonitorNewDataDto>; interval: NodeJS.Timeout }
  >();

  public async getAppData(
    clientId: string,
    appName: string,
  ): Promise<BehaviorSubject<MonitorNewDataDto>> {
    const mockedData: MonitorNewDataDto = await this.getDashboards(appName);

    const subject = new BehaviorSubject(mockedData);
    const interval = setInterval(
      () => this.updateSubject(appName, subject),
      5000,
    );

    this.socketClientMap.set(this.getConnectionKey(clientId, appName), {
      subject,
      interval,
    });

    return subject;
  }

  private async updateSubject(
    appName: string,
    subject: BehaviorSubject<MonitorNewDataDto>,
  ): Promise<void> {
    const data = await this.getDashboards(appName);

    subject.next(data);
  }

  public close(clientId: string, appName: string): boolean {
    const connection = this.socketClientMap.get(
      this.getConnectionKey(clientId, appName),
    );
    connection.subject.unsubscribe();
    clearInterval(connection.interval);
    return this.socketClientMap.delete(clientId + appName);
  }

  private getConnectionKey(clientId: string, appName: string): string {
    return clientId + appName;
  }
}
