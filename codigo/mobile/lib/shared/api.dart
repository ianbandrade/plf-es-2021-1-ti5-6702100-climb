import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/models/user.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiClient extends http.BaseClient {
  http.Client _inner = new http.Client();
  final storage = new FlutterSecureStorage();
  static Map<String, String> headers = {
    'Content-Type': 'application/json; charset=UTF-8'
  };
  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {
    request.headers['cookie'] = headers['cookie'];
    return _inner.send(request);
  }

  Future<http.Response> signIn({String body}) async {
    http.Response response = await http.post(
      Uri.http(env['API_HOST'], '/auth/signin'),
      body: body,
      headers: headers,
    );

    updateCookie(response);

    return response;
  }

  void updateCookie(http.Response response) {
    String rawCookie = response.headers['set-cookie'];
    if (rawCookie != null) {
      int index = rawCookie.indexOf(';');
      headers['cookie'] =
          (index == -1) ? rawCookie : rawCookie.substring(0, index);
    }
  }
}
