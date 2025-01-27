const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

// Handle GET request to the root URL '/'
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello ALX!');
});

// Handle GET request to the '/students' URL
app.get('/students', (req, res) => {
  const dbFile = process.argv[2]; // Get the database file passed as an argument
  if (!dbFile) {
    res.status(400).send('Missing database file argument');
    return;
  }

  const students = [];
  const studentsInCS = [];
  const studentsInSWE = [];

  fs.createReadStream(dbFile)
    .pipe(csv())
    .on('data', (row) => {
      if (row.firstname && row.lastname && row.field) {
        students.push(`${row.firstname} ${row.lastname}`);
        if (row.field === 'CS') {
          studentsInCS.push(row.firstname);
        } else if (row.field === 'SWE') {
          studentsInSWE.push(row.firstname);
        }
      }
    })
    .on('end', () => {
      res.type('text/plain');
      res.send(
        `This is the list of our students\nNumber of students: ${students.length}\n` +
        `Number of students in CS: ${studentsInCS.length}. List: ${studentsInCS.join(', ')}\n` +
        `Number of students in SWE: ${studentsInSWE.length}. List: ${studentsInSWE.join(', ')}`
      );
    });
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server running on port 1245');
});

module.exports = app;
