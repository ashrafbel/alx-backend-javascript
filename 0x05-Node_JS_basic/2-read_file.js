const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length === 0) throw new Error('Cannot load the database');

    const header = lines[0].split(',');

    const fieldIndex = header.indexOf('field');
    const firstNameIndex = header.indexOf('firstname');

    if (fieldIndex === -1 || firstNameIndex === -1) {
      throw new Error('Invalid CSV format');
    }

    const students = lines.slice(1).map((line) => {
      const fields = line.split(',');
      return {
        firstname: fields[firstNameIndex].trim(),
        field: fields[fieldIndex].trim(),
      };
    });

    const validStudents = students.filter((student) => student.firstname && student.field);
    console.log(`Number of students: ${validStudents.length}`);

    const fieldsMap = {};
    validStudents.forEach((student) => {
      if (!fieldsMap[student.field]) {
        fieldsMap[student.field] = [];
      }
      fieldsMap[student.field].push(student.firstname);
    });

    for (const field in fieldsMap) {
      if (Object.prototype.hasOwnProperty.call(fieldsMap, field)) {
        console.log(
          `Number of students in ${field}: ${fieldsMap[field].length}. List: ${fieldsMap[field].join(', ')}`, // <-- Added trailing comma here
        );
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
