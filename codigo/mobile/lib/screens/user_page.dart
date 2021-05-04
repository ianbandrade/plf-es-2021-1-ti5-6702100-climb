import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/models/application.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/shared/api.dart';
import 'package:mobile/widgets/app_tile.dart';
import 'package:mobile/widgets/apps_list.dart';
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

  final List<Application> _applications = [];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    ApiClient().get(Uri.http(env['API_HOST'], '/applications')).then((res) {
      final parsedApp = json.decode(res.body);
      final items = parsedApp['items'];
      print('aqui');
      print(parsedApp['items'].length);
      for (var i = 0; i < items.length; i++) {
        final item = items[i];
        Application app = new Application(
          id: item['id'],
          branch: item['branch'],
          enviroments: item['enviroments'],
          name: item['name'],
          provider: item['provider'],
          repository: item['repository'],
          repositoryName: item['repositoryName'],
          repositoryOwner: item['repositoryOwner'],
          repositoryPath: item['repositoryPath'],
          repositoryURL: item['repositoryUrl'],
          userId: item['userId'],
        );
        setState(() {
          _applications.add(app);
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final routeData = ModalRoute.of(context).settings.arguments as User;
    print(_applications.length);
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
      body: SingleChildScrollView(
        physics: ScrollPhysics(),
        child: Column(
          children: [
            Center(
              child: UserProfile(
                name: routeData.name,
                image: routeData.image,
              ),
            ),
            AppList(
              applications: _applications,
            )
          ],
        ),
      ),
    );
  }
}
