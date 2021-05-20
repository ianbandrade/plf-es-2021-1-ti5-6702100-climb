export class MonitorNewDataDto {
  results: {
    openConnections: {
      metric: any;
      value: [number, string];
    }[];
    responseStatusCode: [
      {
        metric: {
          statusCode: string;
        };
        value: [number, string];
      },
      {
        metric: {
          statusCode: string;
        };
        value: [number, string];
      },
    ];
    averageRequestTime: [
      {
        metric: {
          method: string;
        };
        value: [number, string];
      },
      {
        metric: {
          method: string;
        };
        value: [number, string];
      },
      {
        metric: {
          method: string;
        };
        value: [number, string];
      },
    ];
  };
}
