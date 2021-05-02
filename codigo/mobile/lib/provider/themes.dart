import 'package:flutter/material.dart';

class Themes {
  static lightTheme(context) {
    return ThemeData(
      appBarTheme: AppBarTheme(backgroundColor: Colors.white),
      primaryColor: Colors.grey.shade500,
      brightness: Brightness.light,
      accentColor: Colors.amber,
      scaffoldBackgroundColor: Colors.white,
      fontFamily: 'Alatsi',
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          primary: Colors.grey.shade500,
        ),
      ),
    );
  }

  static darkTheme(context) {
    return ThemeData(
        appBarTheme: AppBarTheme(backgroundColor: Colors.grey.shade900),
        primaryColor: Colors.red,
        brightness: Brightness.dark,
        accentColor: Colors.white,
        scaffoldBackgroundColor: Colors.grey.shade900,
        fontFamily: 'Alatsi',
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            primary: Colors.white24,
          ),
        ));
  }
}
