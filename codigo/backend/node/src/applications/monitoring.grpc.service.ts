import {
  HttpService,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { MonitorNewDataDto } from './dto/monitoring/monitorData.dto';

@Injectable()
export class MonitoringGRPCService {
  constructor(private httpService: HttpService) {}

  async getDashboards(appName: string) {
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

  private async getMetrics(query: string) {
    const requestConfig = { params: { query } };

    return this.httpService
      .get('http://climb.codes:9090/api/v1/query', requestConfig)
      .toPromise()
      .then((response) => response.data.data.result)
      .catch((e) => {
        throw new InternalServerErrorException('Erro na requisição');
      });
  }

  private grpcMap = new Map<
    string,
    { subject: BehaviorSubject<MonitorNewDataDto>; interval: NodeJS.Timeout }
  >();

  public async getAppData(clientId: string, appName: string) {
    const mockedData: MonitorNewDataDto = await this.getDashboards(appName);

    const subject = new BehaviorSubject(mockedData);
    const interval = setInterval(
      () => this.updateSubject(appName, subject),
      5000,
    );

    this.grpcMap.set(this.getConnectionKey(clientId, appName), {
      subject,
      interval,
    });

    return subject;
  }

  private async updateSubject(
    appName,
    subject: BehaviorSubject<MonitorNewDataDto>,
  ) {
    const data = await this.getDashboards(appName);

    subject.next(data);
  }

  public close(clientId: string, appName: string) {
    const connection = this.grpcMap.get(
      this.getConnectionKey(clientId, appName),
    );
    connection.subject.unsubscribe();
    clearInterval(connection.interval);
    return this.grpcMap.delete(clientId + appName);
  }

  private getConnectionKey(clientId: string, appName: string) {
    return clientId + appName;
  }
}
