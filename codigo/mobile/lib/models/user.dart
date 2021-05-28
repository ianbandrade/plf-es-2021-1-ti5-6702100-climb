class User {
  final String id;
  final String name;
  final String role;
  final bool status;
  final String gitHubToken;
  final String gitLabToken;
  final String gitHubAccount;
  final String gitLabAccount;
  final String image;

  User(
      {this.id,
      this.name,
      this.role,
      this.status,
      this.gitHubToken,
      this.gitLabToken,
      this.gitHubAccount,
      this.gitLabAccount,
      this.image});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      role: json['role'],
      gitHubAccount: json['gitHubAccount'],
      gitHubToken: json['gitHubToken'],
      gitLabAccount: json['gitLabAccount'],
      gitLabToken: json['gitLabToken'],
      image: json['image'],
      status: json['status'],
    );
  }
}
