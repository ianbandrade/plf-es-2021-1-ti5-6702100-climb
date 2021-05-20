import 'package:mobile/models/MetricsDataResponse.dart';

class MetricsData {
  final Map<String, List<MetricsDataResponse>> openConnections;
  final Map<String, List<MetricsDataResponse>> responseStatusCode;
  final Map<String, List<MetricsDataResponse>> averageRequestTime;

  MetricsData({
    this.openConnections,
    this.averageRequestTime,
    this.responseStatusCode,
  });
}
