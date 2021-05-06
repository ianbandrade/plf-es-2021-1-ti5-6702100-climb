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
}
