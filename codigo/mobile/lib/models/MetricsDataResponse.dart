class MetricsDataResponse {
  final Map<Object, Object> metric;
  final List<Object> value;

  MetricsDataResponse({
    this.metric,
    this.value,
  });

  factory MetricsDataResponse.fromJson(dynamic json) {
    return MetricsDataResponse(
      metric: json['metric'],
      value: json['value'],
    );
  }
}
