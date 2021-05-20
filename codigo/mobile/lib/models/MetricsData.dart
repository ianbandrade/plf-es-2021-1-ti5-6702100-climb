import 'package:mobile/models/MetricsDataResponse.dart';

class MetricsData {
  final List<MetricsDataResponse> openConnections;
  final List<MetricsDataResponse> responseStatusCode;
  final List<MetricsDataResponse> averageRequestTime;

  MetricsData({
    this.openConnections,
    this.responseStatusCode,
    this.averageRequestTime,
  });

  factory MetricsData.fromJson(dynamic json) {
    List<MetricsDataResponse> auxConnections = [];

    for (var i = 0; i < json['openConnections'].length; i++) {
      MetricsDataResponse connection =
          MetricsDataResponse.fromJson(json['openConnections'][i]);
      auxConnections.add(connection);
    }
    List<MetricsDataResponse> auxResponses = [];
    for (var i = 0; i < json['responseStatusCode'].length; i++) {
      MetricsDataResponse response =
          MetricsDataResponse.fromJson(json['responseStatusCode'][i]);
      auxResponses.add(response);
    }

    List<MetricsDataResponse> auxRequestTime = [];
    for (var i = 0; i < json['averageRequestTime'].length; i++) {
      MetricsDataResponse time =
          MetricsDataResponse.fromJson(json['averageRequestTime'][i]);
      auxRequestTime.add(time);
    }
    return MetricsData(
      openConnections: auxConnections,
      responseStatusCode: auxResponses,
      averageRequestTime: auxRequestTime,
    );
  }
}
