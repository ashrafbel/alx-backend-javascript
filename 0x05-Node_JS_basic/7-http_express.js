const express = require('express');
const fs = require('fs').promises;

const app = express();

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data
      .toString()
      .split('\n')
      .filter((line) => line.trim().length > 0);
    
    const headers = lines[0].split(',');
    const studentData = lines.slice(1);
    if (studentData.length === 0) {
      throw new Error('Cannot load the database');
    }

    const studentsByField = {};
    studentData.forEach((line) => {
      const fields = line.split(',');
      const field = fields[3];
      const firstName = fields[0];

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstName);
    });

    let output = `Number of students: ${studentData.length}\n`;
    for (const [field, students] of Object.entries(studentsByField)) {
      output += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
    }
    return output.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', async (req, res) => {
  const databasePath = process.argv[2];
  try {
    const studentInfo = await countStudents(databasePath);
    res.send(`This is the list of our students\n${studentInfo}`);
  } catch (error) {
    res.send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(1245);

module.exports = app;
