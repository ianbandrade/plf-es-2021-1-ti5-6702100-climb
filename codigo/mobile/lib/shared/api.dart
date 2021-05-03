import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient extends http.BaseClient {
  http.Client _inner = new http.Client();
  final storage = new FlutterSecureStorage();

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {
    String _token = await storage.read(key: "token");

    request.headers['Authorization'] = "Bearer $_token";
    print(request.headers['Authorization'] = "Bearer $_token");
    return _inner.send(request);
  }
}
