import 'package:flutter/material.dart';

class Request {
  final int code;
  final double quantity;
  final Color color;
  final String method;
  final double avgResponsTime;

  Request(
      {this.code, this.quantity, this.color, this.method, this.avgResponsTime});
}
