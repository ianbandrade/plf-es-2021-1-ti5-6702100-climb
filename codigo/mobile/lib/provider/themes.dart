import 'package:flutter/material.dart';

class Themes {
  static final lightTheme = ThemeData(
    appBarTheme: AppBarTheme(backgroundColor: Colors.white),
    scaffoldBackgroundColor: Colors.white,
    colorScheme: ColorScheme.light(),
    fontFamily: 'Alatsi',
  );

  static final darkTheme = ThemeData(
    appBarTheme: AppBarTheme(backgroundColor: Colors.grey.shade900),
    scaffoldBackgroundColor: Colors.grey.shade900,
    colorScheme: ColorScheme.dark(),
    fontFamily: 'Alatsi',
  );
}
