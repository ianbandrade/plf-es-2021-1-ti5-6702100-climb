class MetricsDataResponse {
  final Map<String, Object> metric;
  final Map<String, List<Object>> value;

  MetricsDataResponse({
    this.metric,
    this.value,
  });
}
