import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/models/application.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/shared/api.dart';
import 'package:mobile/widgets/apps_list.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:mobile/widgets/refresh_widget.dart';
import 'package:mobile/widgets/user_profile.dart';

class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  final List<Application> _applications = [
    new Application(
      id: '1',
      branch: 'master',
      enviroments: [],
      name: "express-3",
      provider: "GITHUB",
      repository: 'dasdasd',
      repositoryName: 'express',
      repositoryPath: '/',
      repositoryOwner: 'JoaoGuiMB',
      repositoryURL: 'asdasd',
      userId: '354354',
    ),
  ];

  Future fetchApplicationsData() {
    return ApiClient()
        .get(Uri.http(env['API_HOST'], '/applications'))
        .then((res) {
      final parsedApp = json.decode(res.body);
      final items = parsedApp['items'];
      for (var i = 0; i < items.length; i++) {
        final json = items[i];
        Application app = Application.fromJson(json);
        setState(() {
          _applications.add(app);
        });
      }
    });
  }

  @override
  void initState() {
    super.initState();
    fetchApplicationsData();
  }

  @override
  Widget build(BuildContext context) {
    final User routeData = ModalRoute.of(context).settings.arguments;

    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          leading: IconButton(
              icon: Icon(Icons.logout),
              onPressed: () {
                ApiClient()
                    .post(Uri.http(env['API_HOST'], '/auth/logout'))
                    .then((value) {
                  Navigator.of(context).pop();
                });
              }),
          title: Center(
            child: Logo(
              imageHeight: 20,
              textStyle: Theme.of(context).textTheme.headline6,
            ),
          ),
          actions: [ChangeThemeSwitch()],
        ),
        body: RefreshWidget(
          onRefresh: fetchApplicationsData,
          child: SingleChildScrollView(
            physics: ScrollPhysics(),
            child: Column(
              children: [
                Center(
                  child: UserProfile(
                    name: routeData.gitHubAccount,
                    image: routeData.image,
                  ),
                ),
                AppList(
                  applications: _applications,
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
