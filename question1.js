const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateGrade(marks) {
    if (marks > 79) {
        return 'A';
    } else if (marks >= 60 && marks <= 79) {
        return 'B';
    } else if (marks >= 49 && marks <= 59) {
        return 'C';
    } else if (marks >= 40 && marks <= 49) {
        return 'D';
    } else {
        return 'E';
    }
}

rl.question("Enter student marks (between 0 and 100): ", (answer) => {
    const marks = parseFloat(answer);
    const grade = generateGrade(marks);
    console.log("Grade:", grade);
    rl.close();
});
