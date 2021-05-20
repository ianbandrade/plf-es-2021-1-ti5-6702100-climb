import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { MonitorNewDataDto } from './dto/monitoring/monitorData.dto';

@Injectable()
export class MonitoringGRPCService {
  private grpcMap = new Map<
    string,
    { subject: BehaviorSubject<MonitorNewDataDto>; interval: NodeJS.Timeout }
  >();

  public getAppData(clientId: string, appName: string) {
    return this.createSubscription(clientId + appName);
  }

  private createSubscription(subCode: string) {
    const mockedData: MonitorNewDataDto = {
      results: {
        openConnections: [
          {
            metric: {},
            value: [1621479446.37, '0'],
          },
        ],
        responseStatusCode: [
          {
            metric: {
              statusCode: '2XX',
            },
            value: [1621479707.554, '2'],
          },
          {
            metric: {
              statusCode: '4XX',
            },
            value: [1621479707.554, '1'],
          },
        ],
        averageRequestTime: [
          {
            metric: {
              method: 'GET',
            },
            value: [1621480339.1, '10008.590702999996'],
          },
          {
            metric: {
              method: 'POST',
            },
            value: [1621480339.1, '2.334658'],
          },
          {
            metric: {
              method: 'DELETE',
            },
            value: [1621480339.1, 'NaN'],
          },
        ],
      },
    };

    const subject = new BehaviorSubject(mockedData);
    const interval = setInterval(() => this.updateSubject(subject), 1000);

    this.grpcMap.set(subCode, { subject, interval });

    return subject;
  }

  private updateSubject(subject: BehaviorSubject<MonitorNewDataDto>) {
    const mockedData: MonitorNewDataDto = {
      results: {
        openConnections: [
          {
            metric: {},
            value: [1621479446.37, '0'],
          },
        ],
        responseStatusCode: [
          {
            metric: {
              statusCode: '2XX',
            },
            value: [1621479707.554, '2'],
          },
          {
            metric: {
              statusCode: '4XX',
            },
            value: [1621479707.554, '1'],
          },
        ],
        averageRequestTime: [
          {
            metric: {
              method: 'GET',
            },
            value: [1621480339.1, '10008.590702999996'],
          },
          {
            metric: {
              method: 'POST',
            },
            value: [1621480339.1, '2.334658'],
          },
          {
            metric: {
              method: 'DELETE',
            },
            value: [1621480339.1, 'NaN'],
          },
        ],
      },
    };

    subject.next(mockedData);
  }

  public close(clientId: string, appName: string) {
    const connection = this.grpcMap.get(clientId + appName);
    connection.subject.unsubscribe();
    clearInterval(connection.interval);
    return this.grpcMap.delete(clientId + appName);
  }
}
