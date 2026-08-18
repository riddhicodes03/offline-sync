import '../model/student.dart';
import '../database/db_helper.dart';
import '../services/api_services.dart';

class StudentRepository {
  static Future<List<Student>> getStudents() {
    return DbHelper.getStudents();
  }

  static Future<void> addStudent(Student student) async {
    final localId = await DbHelper.insertStudent(student);

    try {
      final serverId = await ApiServices.addStudent(student);
      print('localId: $localId');
      print('serverId : $serverId');
      await DbHelper.markSynced(localId, serverId);
    } catch (e) {
      print('Offline or server down');
    }
  }

  static Future<void> syncAll() async {
    final unsynced = await DbHelper.getUnsynced();
    print('unsynced');
    print(unsynced);
    for (var row in unsynced) {
      try {
        final student = Student.fromMap(row);
        final serverId = await ApiServices.addStudent(student);
        // print('local id: ${row['id']}');
        // print('remote id : $serverId');
        await DbHelper.markSynced(row['id'], serverId);
      } catch (e) {
        print('Push failed for ${row['name']}: $e');
      }
    }
    final remoteStudents = await ApiServices.fetchStudents();
    final localStudents = await DbHelper.getStudents();
    print(
      'local students: ${localStudents.map((s) => '${s.name}, server_id: ${s.serverId}').toList()}',
    );
    print(
      'remote students: ${remoteStudents.map((s) => '${s.name} and ${s.id}').toList()}',
    );
    final knownServerIds = localStudents
        .map((s) => s.serverId)
        .where((id) => id != null)
        .toSet();
    print('known server ids $knownServerIds');
    for (var remote in remoteStudents) {
      if (!knownServerIds.contains(remote.id)) {
        await DbHelper.insertStudent(
          Student(
            serverId: remote.id,
            name: remote.name,
            roomNo: remote.roomNo,
            synced: 1,
          ),
        );
      }
    }
  }
}
