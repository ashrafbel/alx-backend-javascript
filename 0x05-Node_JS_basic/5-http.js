const http = require('http');
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');

    const lines = data.split('\n')
      .filter((line) => line.trim() !== '')
      .slice(1);

    const students = lines.map((line) => line.split(','));

    const totalStudents = students.length;

    const studentsByField = students.reduce((acc, student) => {
      const [firstname, , , field] = student;
      if (!acc[field]) acc[field] = [];
      acc[field].push(firstname);
      return acc;
    }, {});

    let output = `Number of students: ${totalStudents}\n`;

    Object.entries(studentsByField).forEach(([field, names]) => {
      output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    });

    return output.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const databasePath = process.argv[2];
      if (!databasePath) {
        res.end('This is the list of our students\nCannot load the database');
        return;
      }

      const studentData = await countStudents(databasePath);
      res.end(`This is the list of our students\n${studentData}`);
    } catch (error) {
      res.end(`This is the list of our students\n${error.message}`);
    }
  }
});

app.listen(1245, () => {
  console.log('Server running on port 1245');
});

module.exports = app;
