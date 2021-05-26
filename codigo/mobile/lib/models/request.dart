import 'package:flutter/material.dart';

class Request {
  String code;
  String quantity;
  Color color;
  String method;
  String avgResponsTime;
  Map<String, List<Map<String, Object>>> currentConnections;

  Request(
      {this.code, this.avgResponsTime, this.color, this.method, this.quantity});
}
