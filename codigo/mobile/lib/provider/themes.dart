import 'package:flutter/material.dart';

class Themes {
  static lightTheme(context) {
    return ThemeData(
      appBarTheme: AppBarTheme(backgroundColor: Colors.white),
      primaryColor: Colors.white,
      brightness: Brightness.light,
      accentColor: Colors.grey.shade500,
      scaffoldBackgroundColor: Colors.white,
      fontFamily: 'Alatsi',
      textTheme: TextTheme(
        headline4: TextStyle(
          fontSize: 36,
          letterSpacing: 3,
          color: Colors.grey.shade800,
        ),
        headline6: TextStyle(
          color: Colors.white,
          fontSize: 24,
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
      textTheme: TextTheme(
        headline4: TextStyle(
          fontSize: 36,
          letterSpacing: 3,
          color: Colors.white,
        ),
        headline6: TextStyle(
          color: Colors.grey.shade700,
          fontSize: 24,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          primary: Colors.white24,
        ),
      ),
    );
  }
}
