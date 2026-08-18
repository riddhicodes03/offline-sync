import 'package:flutter/material.dart';

import 'package:students/core/model/student.dart';
import 'package:students/core/repository/student_repository.dart';

import 'package:students/screen/insert_page.dart';

class DisplayStudent extends StatefulWidget {
  const DisplayStudent({super.key});

  @override
  State<DisplayStudent> createState() => _DisplayStudentState();
}

class _DisplayStudentState extends State<DisplayStudent> {
  List<Student> students = [];
  @override
  void initState() {
    super.initState();
    print('app started');
    loadStudents();
    StudentRepository.syncAll().then((_) => loadStudents());
  }

  void loadStudents() async {
    final data = await StudentRepository.getStudents();
    setState(() {
      students = data;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Students')),
      body: ListView.builder(
        itemCount: students.length,
        itemBuilder: (context, index) {
          final s = students[index];
          return ListTile(
            title: Text(s.name),
            subtitle: Text('Room: ${s.roomNo}'),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => InsertPage()),
          );
          loadStudents();
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
