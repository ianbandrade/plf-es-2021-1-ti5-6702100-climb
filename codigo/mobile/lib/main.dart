import 'package:flutter/material.dart';
import 'package:mobile/provider/theme_provider.dart';
import 'package:mobile/routes.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:provider/provider.dart';
import 'package:mobile/provider/themes.dart';

Future main() async {
  await DotEnv.load(fileName: ".env");
  runApp(ClimbApp());
}

class ClimbApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => ChangeNotifierProvider(
      create: (context) => ThemeProvider(),
      builder: (context, _) {
        final themeProvider = Provider.of<ThemeProvider>(context);
        return MaterialApp(
          title: 'CLIMB',
          themeMode: themeProvider.themeMode,
          theme: Themes.lightTheme(context),
          darkTheme: Themes.darkTheme(context),
          initialRoute: '/',
          routes: customRoutes,
        );
      });
}
