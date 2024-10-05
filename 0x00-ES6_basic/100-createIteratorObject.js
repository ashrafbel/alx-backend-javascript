export default function createIteratorObject(report) {
  const employees = [];

  for (const department in report.allEmployees) {
    // Use Object.prototype.hasOwnProperty to avoid issues with shadowing
    if (Object.prototype.hasOwnProperty.call(report.allEmployees, department)) {
      employees.push(...report.allEmployees[department]);
    }
  }

  return employees[Symbol.iterator]();
}
