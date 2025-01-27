const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // Attempt to read the CSV file
    const data = await fs.readFile(path, 'utf-8');
    
    // Split the data into rows (lines)
    const rows = data.split('\n').filter(row => row.trim() !== '');

    // If there are no rows, throw an error
    if (rows.length === 0) {
      throw new Error('Cannot load the database');
    }

    // Get the headers (first row) and the students' data (subsequent rows)
    const headers = rows[0].split(',');
    const students = rows.slice(1).map(row => row.split(','));

    // Create an object to hold the student counts by field
    const fields = {};

    // Loop through the student data
    students.forEach(student => {
      const field = student[3]; // Assuming the field is in the 4th column (index 3)
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student[0]); // Assuming the student's name is in the 1st column (index 0)
    });

    // Log the total number of students
    console.log(`Number of students: ${students.length}`);

    // Log the number of students in each field
    Object.keys(fields).forEach(field => {
      console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    });
  } catch (error) {
    // Handle errors (such as file not found)
    console.log('Error:', error.message);
  }
}

module.exports = countStudents;
