const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerDemerit = 5;
    if (speed <= speedLimit) {
        console.log("Ok");
        return 0;
    } else {
        const demeritPoints = Math.floor((speed - speedLimit) / kmPerDemerit);
        console.log("Points:", demeritPoints);
        if (demeritPoints >= 12) {
            console.log("License suspended");
        }
        return demeritPoints;
    }
}

rl.question("Enter car speed (km/h): ", (answer) => {
    const carSpeed = parseFloat(answer);
    calculateDemeritPoints(carSpeed);
    rl.close();
});
