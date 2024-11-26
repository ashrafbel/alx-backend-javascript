process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', () => {
  const name = process.stdin.read();
  
  if (name !== null) {
    const trimmedName = name.toString().trim();
    
    if (trimmedName) {
      process.stdout.write(`Your name is: ${trimmedName}\n`);
    }
    
    process.stdout.write('This important software is now closing\n');
    process.exit();
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
