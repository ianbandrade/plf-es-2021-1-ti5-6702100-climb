import 'package:flutter/material.dart';
import 'package:mobile/models/application.dart';

import 'app_tile.dart';

class AppList extends StatelessWidget {
  List<Application> applications;

  AppList({this.applications});

  @override
  Widget build(BuildContext context) {
    final userHasNoApp = applications.length == 0 ? true : false;
    return userHasNoApp
        ? Center(
            child: Text(
              'Usuário não possui nenhuma aplicação ainda',
              style: Theme.of(context).textTheme.headline4,
            ),
          )
        : ListView.builder(
            physics: NeverScrollableScrollPhysics(),
            shrinkWrap: true,
            itemCount: applications.length,
            itemBuilder: (ctx, index) {
              final app = applications[index];
              return AppTile(
                appName: app.name,
                orgRepo: '${app.repositoryOwner}/${app.repositoryName}',
                provider: app.provider,
              );
            },
          );
  }
}
