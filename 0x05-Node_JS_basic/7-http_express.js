const express = require('express');
const fs = require('fs').promises; // Using fs.promises for async/await

const app = express();
const PORT = 1245;
const DB_FILE = process.argv[2] || ''; // Simplified check for the DB file

// Helper function to get the student report
const getStudentReport = async (dataPath) => {
  if (!dataPath) {
    throw new Error('Cannot load the database');
  }

  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const reportParts = [];
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    // Parse the student records and categorize them by field
    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];

      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }

      const studentEntries = studentPropNames.map((propName, idx) => [
        propName,
        studentPropValues[idx],
      ]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce(
      (acc, group) => acc + group.length, 0,
    );
    reportParts.push(`Number of students: ${totalStudents}`);

    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`);
    }

    return reportParts.join('\n');
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

// Root route handler
const rootRouteHandler = (_, res) => {
  res.send('Hello Holberton School!');
};

// Students route handler
const studentsRouteHandler = async (_, res) => {
  const responseParts = ['This is the list of our students'];

  try {
    const report = await getStudentReport(DB_FILE);
    responseParts.push(report);
    res.type('text/plain');
    res.status(200).send(responseParts.join('\n'));
  } catch (err) {
    responseParts.push(err.message);
    res.type('text/plain');
    res.status(500).send(responseParts.join('\n'));
  }
};

// Define routes
app.get('/', rootRouteHandler);
app.get('/students', studentsRouteHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
