import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';

class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  @override
  Widget build(BuildContext context) {
    final routeData = ModalRoute.of(context).settings.arguments as User;

    return Container(
      child: Text('aadns ${routeData.name}'),
    );
  }
}
