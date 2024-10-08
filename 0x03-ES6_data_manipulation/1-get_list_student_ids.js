export default function getListStudentIds(studentsLists) {
  if (!Array.isArray(studentsLists)) {
    return [];
  }
  return studentsLists.map((student) => student.id);
}
