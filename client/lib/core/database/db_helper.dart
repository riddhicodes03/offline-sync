import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'package:students/core/model/student.dart';

class DbHelper {
  static Database? _db;
  static Future<Database> getDB() async {
    if (_db != null) return _db!;
    _db = await _initDB();
    return _db!;
  }

  static Future<Database> _initDB() async {
    final path = join(await getDatabasesPath(), 'student.db');
    return openDatabase(
      path,
      version: 1,
      onCreate: (db, version) {
        return db.execute(
          'CREATE TABLE students(id INTEGER PRIMARY KEY AUTOINCREMENT,server_id INTEGER, name TEXT, room_no TEXT,synced INTEGER DEFAULT 0)',
        );
      },
    );
  }

  static Future<int> insertStudent(Student student) async {
    final db = await getDB();
    return await db.insert('students', student.toMap());
  }

  static Future<List<Student>> getStudents() async {
    final db = await getDB();
    final maps = await db.query('students');
    return maps.map((map) => Student.fromMap(map)).toList();
  }

  static Future<List<Map<String, dynamic>>> getUnsynced() async {
    final db = await getDB();
    return db.query('students', where: 'synced=0');
  }

  static Future<void> markSynced(int id, int serverId) async {
    final db = await getDB();
    final rowsAffected = await db.update(
      'students',
      {'synced': 1, 'server_id': serverId},
      where: 'id=?',
      whereArgs: [id],
    );
    print(
      'markSynced: updated $rowsAffected row(s) for local id $id with server_id $serverId',
    );
  }
}
