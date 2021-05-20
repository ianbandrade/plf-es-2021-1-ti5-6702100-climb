import 'package:mobile/models/enviroments.dart';

class Application {
  final String id;
  final String name;
  final String repository;
  final String repositoryURL;
  final String repositoryName;
  final String repositoryOwner;
  final String provider;
  final String branch;
  final String repositoryPath;
  final String userId;
  final List<Enviroment> enviroments;

  Application({
    this.id,
    this.name,
    this.repository,
    this.repositoryURL,
    this.repositoryName,
    this.repositoryOwner,
    this.provider,
    this.branch,
    this.repositoryPath,
    this.userId,
    this.enviroments,
  });

  factory Application.fromJson(Map<String, dynamic> json) {
    return Application(
      id: json['id'],
      branch: json['branch'],
      enviroments: json['enviroments'],
      name: json['name'],
      provider: json['provider'],
      repository: json['repository'],
      repositoryName: json['repositoryName'],
      repositoryOwner: json['repositoryOwner'],
      repositoryPath: json['repositoryPath'],
      repositoryURL: json['repositoryUrl'],
      userId: json['userId'],
    );
  }
}
