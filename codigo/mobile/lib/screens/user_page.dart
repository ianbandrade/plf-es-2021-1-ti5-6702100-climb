import 'package:flutter/material.dart';

class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  @override
  Widget build(BuildContext context) {
    final userData = ModalRoute.of(context).settings.arguments;

    return Container(
      child: Text('aadns ${userData}'),
    );
  }
}
