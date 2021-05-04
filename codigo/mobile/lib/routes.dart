import 'package:flutter/material.dart';
import 'package:mobile/screens/home.dart';
import 'package:mobile/screens/user_page.dart';

var customRoutes = <String, WidgetBuilder>{
  '/': (context) => UserPage(),
  '/user': (context) => HomePage(),
};
