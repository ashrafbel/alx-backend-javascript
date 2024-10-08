export default function getStudentIdsSum(students) {
  const sumStudenId = students.reduce((accumulator, student) => accumulator + student.id, 0);
  return sumStudenId;
}
