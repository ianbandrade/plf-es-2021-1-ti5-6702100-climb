import 'package:flutter/material.dart';

class RefreshWidget extends StatefulWidget {
  final Widget child;
  final Future Function() onRefresh;

  RefreshWidget({
    this.child,
    this.onRefresh,
  });

  @override
  _RefreshWidgetState createState() => _RefreshWidgetState();
}

class _RefreshWidgetState extends State<RefreshWidget> {
  @override
  Widget build(BuildContext context) {
    return buildAndroidList();
  }

  Widget buildAndroidList() => RefreshIndicator(
        child: widget.child,
        onRefresh: widget.onRefresh,
      );
}
