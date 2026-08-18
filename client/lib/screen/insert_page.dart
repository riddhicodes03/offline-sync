import 'package:flutter/material.dart';
import 'package:students/core/model/student.dart';
import 'package:students/core/repository/student_repository.dart';

class InsertPage extends StatelessWidget {
  InsertPage({super.key});
  final nameController = TextEditingController();
  final roomController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Add student')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Name'),
            ),
            TextField(
              controller: roomController,
              decoration: InputDecoration(labelText: 'Room no'),
            ),
            SizedBox(height: 30),
            ElevatedButton(
              onPressed: () async {
                final navigator = Navigator.of(context);
                final student = Student(
                  name: nameController.text,
                  roomNo: roomController.text,
                );
                await StudentRepository.addStudent(student);
                navigator.pop();
              },
              child: Text('Save'),
            ),
          ],
        ),
      ),
    );
  }
}
