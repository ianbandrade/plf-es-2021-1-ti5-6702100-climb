import 'package:flutter/material.dart';

class Themes {
  static lightTheme(context) {
    return ThemeData(
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      primaryColor: Colors.white,
      brightness: Brightness.light,
      accentColor: Colors.grey.shade700,
      scaffoldBackgroundColor: Colors.white,
      fontFamily: 'Alatsi',
      textTheme: TextTheme(
        headline3: TextStyle(
          fontSize: 40,
          letterSpacing: 3,
          color: Colors.blueGrey[800],
        ),
        headline4: TextStyle(
          fontSize: 26,
          letterSpacing: 2,
          color: Colors.grey.shade900,
        ),
        headline5: TextStyle(
          color: Colors.white,
        ),
        headline6: TextStyle(
          color: Colors.grey.shade700,
          fontSize: 18,
        ),
      ),
    );
  }

  static darkTheme(context) {
    return ThemeData(
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.grey.shade900,
        elevation: 0,
      ),
      primaryColor: Colors.grey.shade700,
      brightness: Brightness.dark,
      accentColor: Colors.white,
      scaffoldBackgroundColor: Colors.grey.shade900,
      fontFamily: 'Alatsi',
      textTheme: TextTheme(
        headline3: TextStyle(
          fontSize: 40,
          letterSpacing: 3,
          color: Colors.white,
        ),
        headline4: TextStyle(
          fontSize: 26,
          letterSpacing: 2,
          color: Colors.white,
        ),
        headline5: TextStyle(
          color: Colors.grey.shade700,
          fontSize: 24,
        ),
        headline6: TextStyle(
          color: Colors.white,
          fontSize: 18,
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
