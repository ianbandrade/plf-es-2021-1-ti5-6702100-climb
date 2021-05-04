import 'package:flutter/material.dart';
import 'package:mobile/models/application.dart';

import 'app_tile.dart';

class AppList extends StatelessWidget {
  List<Application> applications;

  AppList({this.applications});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        physics: NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemCount: applications.length,
        itemBuilder: (ctx, index) {
          final app = applications[index];
          print(app);
          return AppTile(
            appName: app.name,
            orgRepo: '${app.repositoryOwner}/${app.repositoryName}',
            provider: app.provider,
          );
        });
  }
}
