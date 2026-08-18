class Student {
  final int? id;
  final int? serverId;
  final String name;
  final String roomNo;
  final int synced;

  Student({
    this.id,
    this.serverId,
    required this.name,
    required this.roomNo,
    this.synced = 0,
  });
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'server_id': serverId,
      'name': name,
      'room_no': roomNo,
      'synced': synced,
    };
  }

  factory Student.fromMap(Map<String, dynamic> map) {
    return Student(
      id: map['id'],
      serverId: map['server_id'],
      name: map['name'],
      roomNo: map['room_no'],
      synced: map['synced'] ?? 1,
    );
  }
}
