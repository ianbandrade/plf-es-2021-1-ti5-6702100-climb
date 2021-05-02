import 'package:flutter/material.dart';
import 'package:mobile/widgets/button.dart';
import 'package:mobile/widgets/text_field.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:mobile/provider/theme_provider.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:provider/provider.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final text = Provider.of<ThemeProvider>(context).themeMode == ThemeMode.dark
        ? 'Dark Mode'
        : 'Light Mode';

    final _emailController = TextEditingController();
    final passwordController = TextEditingController();
    print(Theme.of(context).textTheme.headline6);
    return Scaffold(
        appBar: AppBar(
          elevation: 0,
          actions: [ChangeThemeSwitch()],
        ),
        body: Center(
          child: SingleChildScrollView(
            physics: NeverScrollableScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Logo(),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 50, vertical: 10),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 30),
                        child: Column(
                          children: [
                            AdaptativeTextfield(
                              label: 'Email',
                              controller: _emailController,
                            ),
                            AdaptativeTextfield(
                              isPassword: true,
                              label: 'Senha',
                              controller: passwordController,
                            ),
                          ],
                        ),
                      ),
                      AdaptativeButton(
                        label: 'Entrar',
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).accentColor,
                        ),
                        textStyle: Theme.of(context).textTheme.headline6,
                        onPressed: () {},
                      )
                    ],
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
