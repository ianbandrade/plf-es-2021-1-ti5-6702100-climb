import 'dart:convert';

import 'package:flutter/material.dart';
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

    bool checkFieldsEmpty() {
      return _emailController.text.isEmpty || _emailController.text.isEmpty;
    }

    final storage = new FlutterSecureStorage();

    _handleSignIn() async {
      final body = json.encode(
        {
          'email': _emailController.text,
          'password': _passwordController.text,
        },
      );
      try {
        final response = await http.post(
          Uri.http(env['API_HOST'], '/auth/signin'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: body,
        );
        print(response.statusCode);
        if (response.statusCode == 201) {
          final token = json.decode(response.body)['token'];
          print(response.body);
          if (token != null) {
            await storage.write(key: 'token', value: token);
            ApiClient().get(Uri.http(env['API_HOST'], '/auth/me')).then((res) {
              Navigator.of(context)
                  .pushNamed('/user', arguments: json.decode(res.body));
            });
          }
        } else {
          final messages = json.decode(response.body)['message'];

          showDialog(
              context: context,
              builder: (BuildContext ctx) {
                return AlertDialog(
                  title: Text(
                    'Erro ao realizar login',
                    style: TextStyle(color: Theme.of(ctx).accentColor),
                  ),
                  content: Text(messages[0]),
                );
              });
        }
      } catch (error) {
        print('error aqui');
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
                Logo(),
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
                        textStyle: Theme.of(context).textTheme.headline6,
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
