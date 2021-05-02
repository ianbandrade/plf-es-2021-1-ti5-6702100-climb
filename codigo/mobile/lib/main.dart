import 'package:flutter/material.dart';
import 'package:mobile/provider/theme_provider.dart';
import 'package:mobile/screens/home.dart';
import 'package:provider/provider.dart';
import 'package:mobile/provider/themes.dart';

void main() => runApp(ClimbApp());

class ClimbApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => ChangeNotifierProvider(
      create: (context) => ThemeProvider(),
      builder: (context, _) {
        final themeProvider = Provider.of<ThemeProvider>(context);
        return MaterialApp(
          title: 'CLIMB',
          home: HomePage(),
          themeMode: themeProvider.themeMode,
          theme: Themes.lightTheme(context),
          darkTheme: Themes.darkTheme(context),
        );
      });
}
