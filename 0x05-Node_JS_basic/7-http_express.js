const express = require('express');
const fs = require('fs').promises;

const app = express();

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Remove header
    lines.shift();

    const students = {};
    const fields = {};

    lines.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (!students[field]) {
        students[field] = [];
      }
      students[field].push(firstname);
      fields[field] = (fields[field] || 0) + 1;
    });

    const output = [];
    output.push(`Number of students: ${lines.length}`);
    for (const [field, names] of Object.entries(students)) {
      output.push(`Number of students in ${field}: ${fields[field]}. List: ${names.join(', ')}`);
    }

    return output.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', async (req, res) => {
  try {
    const database = process.argv[2];
    const output = await countStudents(database);
    res.send(`This is the list of our students\n${output}`);
  } catch (error) {
    res.send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(1245);

module.exports = app;
