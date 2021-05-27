import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/shared/api.dart';
import 'package:mobile/widgets/button.dart';
import 'package:mobile/widgets/input.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final _emailController = TextEditingController();
    final _passwordController = TextEditingController();

    final storage = new FlutterSecureStorage();

    _handleSignIn() async {
      final body = json.encode(
        {
          'email': _emailController.text,
          'password': _passwordController.text,
        },
      );

      try {
        final response = await ApiClient().signIn(
          body: body,
        );

        if (response.statusCode == 200) {
          final parsedUser = json.decode(response.body)['user'];
          User userData = User.fromJson(parsedUser);
          Navigator.of(context).pushNamed('/user', arguments: userData);
        } else {
          final messages = json.decode(response.body)['message'];
          var text;
          if (messages.runtimeType == String) {
            text = messages;
          } else {
            text = messages[0];
          }
          showDialog(
              context: context,
              builder: (BuildContext ctx) {
                return AlertDialog(
                  actions: <Widget>[
                    // define os botões na base do dialogo
                    Button(
                      label: 'Fechar',
                      textStyle: Theme.of(context).textTheme.headline5,
                      style: ElevatedButton.styleFrom(
                        primary: Theme.of(context).accentColor,
                      ),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                  title: Text(
                    'Erro ao realizar login',
                    style: TextStyle(color: Theme.of(ctx).accentColor),
                  ),
                  content: Text(text),
                );
              });
        }
      } catch (error) {
        print(error);
      }
    }

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
                Logo(
                  textStyle: Theme.of(context).textTheme.headline3,
                  imageHeight: 60,
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 50, vertical: 10),
                  child: Column(
                    children: [
                      Column(
                        children: [
                          Input(
                            label: 'Email',
                            controller: _emailController,
                            icon: Icons.email,
                          ),
                          Input(
                            isPassword: true,
                            label: 'Senha',
                            icon: Icons.lock,
                            controller: _passwordController,
                          ),
                        ],
                      ),
                      Button(
                        label: 'Entrar',
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).accentColor,
                        ),
                        textStyle: Theme.of(context).textTheme.headline5,
                        onPressed: () => _handleSignIn(),
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
