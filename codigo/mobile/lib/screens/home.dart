import 'package:flutter/material.dart';
import 'package:mobile/provider/theme_provider.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:provider/provider.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final text = Provider.of<ThemeProvider>(context).themeMode == ThemeMode.dark
        ? 'Dark Mode'
        : 'Light Mode';

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.orange,
        title: Text('Hello'),
        actions: [ChangeThemeSwitch()],
      ),
      body: Center(
        child: Text(
          'Hello ${text}',
        ),
      ),
    );
  }
}
