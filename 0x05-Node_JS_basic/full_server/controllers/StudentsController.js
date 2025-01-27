import readDatabase from '../utils'; // Add .js extension

const VALID_MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(req, res) {
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(dataPath)
      .then((studentGroups) => {
        const responseParts = ['This is the list of our students'];
        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          responseParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }

        res.status(200).send(responseParts.join('\n'));
      })
      .catch((err) => {
        res.status(500).send(err instanceof Error ? err.message : err.toString());
      });
  }

  static getAllStudentsByMajor(req, res) {
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = req.params;

    if (!VALID_MAJORS.includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    return readDatabase(dataPath)
      .then((studentGroups) => {
        if (studentGroups[major]) {
          const group = studentGroups[major];
          return res.status(200).send(`List: ${group.map((student) => student.firstname).join(', ')}`);
        }
        return res.status(200).send(''); // Return empty response if no students for the major
      })
      .catch((err) => res.status(500).send(err instanceof Error ? err.message : err.toString()));
  }
}

export default StudentsController;
