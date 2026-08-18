import 'package:http/http.dart' as http;
import 'dart:convert';
import '../model/student.dart';

class ApiServices {
  static const baseUrl = 'http://localhost:3000/api/';

  static Future<List<Student>> fetchStudents() async {
    final res = await http.get(Uri.parse(baseUrl));
    final List data = jsonDecode(res.body);
    return data.map((json) => Student.fromMap(json)).toList();
  }

  static Future<int> addStudent(Student student) async {
    final res = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(student.toMap()),
    );
    final data = jsonDecode(res.body);
    return data['id'];
  }
}
