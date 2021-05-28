import 'package:mobile/models/MetricsData.dart';

class DashboardData {
  final MetricsData results;

  DashboardData({
    this.results,
  });

  factory DashboardData.fromJson(dynamic json) {
    return DashboardData(results: MetricsData.fromJson(json['results']));
  }
}
