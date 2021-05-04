import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:mobile/widgets/user_profile.dart';

class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  User user = new User(
    id: 'dsad',
    name: 'João Guilherme',
    gitHubAccount: 'JoaoGuiMB',
    gitLabAccount: 'Masdasd',
    image: 'asdsad',
  );

  @override
  Widget build(BuildContext context) {
    //final routeData = ModalRoute.of(context).settings.arguments as User;

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        leading: Icon(Icons.menu),
        title: Center(
          child: Logo(
            imageHeight: 20,
            textStyle: Theme.of(context).textTheme.headline6,
          ),
        ),
        actions: [ChangeThemeSwitch()],
      ),
      body: ListView(children: [
        Center(
          child: UserProfile(
            name: 'João',
            image: 'oi',
          ),
        ),
      ]),
    );
  }
}
