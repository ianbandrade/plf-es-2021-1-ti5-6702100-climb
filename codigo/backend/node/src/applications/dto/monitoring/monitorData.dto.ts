export class MonitorNewDataDto {
  results: MonitorResults;
}

class MonitorResults {
  openConnections: Metrics[];
  responseStatusCode: Metrics[];
  averageRequestTime: Metrics[];
}

class Metrics {
  metric: any;
  value: [number, string];
}
