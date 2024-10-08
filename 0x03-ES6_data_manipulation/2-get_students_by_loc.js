export default function getListStudents(students, city) {
  const filterCity = students.filter((student) => student.location === city);
  return filterCity;
}
