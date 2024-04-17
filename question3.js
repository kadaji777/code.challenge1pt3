const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateNetSalary(grossSalary, disabilityExemption, hasMortgage, hasLifeInsurance, hasHosp) {
    // PAYE rates from 1 July 2023
    const payeRates = [
        { min: 0, max: 24000, rate: 0.1 },
        { min: 24001, max: 32333, rate: 0.25 },
        { min: 32334, max: 500000, rate: 0.3 },
        { min: 500001, max: 800000, rate: 0.325 },
        { min: 800001, max: Infinity, rate: 0.35 }
    ];

    // NHIF rates from 1 April 2015
    const nhifRates = [
        { min: 0, max: 5999, deduction: 150 },
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        { min: 15000, max: 19999, deduction: 600 },
        { min: 20000, max: 24999, deduction: 750 },
        { min: 25000, max: 29999, deduction: 850 },
        { min: 30000, max: 34999, deduction: 900 },
        { min: 35000, max: 39999, deduction: 950 },
        { min: 40000, max: 44999, deduction: 1000 },
        { min: 45000, max: 49999, deduction: 1100 },
        { min: 50000, max: 59999, deduction: 1200 },
        { min: 60000, max: 69999, deduction: 1300 },
        { min: 70000, max: 79999, deduction: 1400 },
        { min: 80000, max: 89999, deduction: 1500 },
        { min: 90000, max: 99999, deduction: 1600 },
        { min: 100000, max: Infinity, deduction: 1700 }
    ];

    // NSSF rates from February 2024 onwards
    const nssfTier1Limit = 7000;
    const nssfTier2Limit = 36000;
    const nssfEmployeeRate = 0.06;
    const nssfEmployerRate = 0.06;

    // Calculate PAYE
    let paye = 0;
    for (const rate of payeRates) {
        if (grossSalary > rate.max) {
            paye += (rate.max - rate.min + 1) * rate.rate;
        } else {
            paye += (grossSalary - rate.min + 1) * rate.rate;
            break;
        }
    }

    // Calculate NHIF
    let nhif = 0;
    for (const rate of nhifRates) {
        if (grossSalary > rate.max) {
            nhif = rate.deduction;
        } else {
            nhif = rate.deduction;
            break;
        }
    }

    // Calculate NSSF
    let nssfEmployee = 0;
    let nssfEmployer = 0;
    if (grossSalary <= nssfTier1Limit) {
        nssfEmployee = grossSalary * nssfEmployeeRate;
        nssfEmployer = grossSalary * nssfEmployerRate;
    } else if (grossSalary <= nssfTier2Limit) {
        nssfEmployee = nssfTier1Limit * nssfEmployeeRate;
        nssfEmployer = nssfTier1Limit * nssfEmployerRate;
    } else {
        nssfEmployee = nssfTier1Limit * nssfEmployeeRate + (grossSalary - nssfTier2Limit) * nssfEmployeeRate;
        nssfEmployer = nssfTier1Limit * nssfEmployerRate + (grossSalary - nssfTier2Limit) * nssfEmployerRate;
    }

    // Calculate net salary
    let netSalary = grossSalary - paye - nhif - nssfEmployee;

    // Additional deductions or reliefs
    if (disabilityExemption) {
        netSalary += 150000; // Disability Exemption
    }
    if (hasMortgage) {
        netSalary -= 300000; // Allowable Owner Occupier Interest
    }
    if (hasLifeInsurance) {
        netSalary -= 60000; // Insurance Relief
    }
    if (hasHosp) {
        netSalary -= 108000; // Affordable Housing Relief
    }

    return {
        grossSalary,
        paye,
        nhif,
        nssfEmployee,
        nssfEmployer,
        netSalary
    };
}

rl.question("Enter gross salary: ", (grossSalary) => {
    const disabilityExemption = true; // Modify this according to user input
    const hasMortgage = true; // Modify this according to user input
    const hasLifeInsurance = true; // Modify this according to user input
    const hasHosp = true; // Modify this according to user input

    const salaryDetails = calculateNetSalary(parseFloat(grossSalary), disabilityExemption, hasMortgage, hasLifeInsurance, hasHosp);
    console.log("Salary Details:", salaryDetails);
    rl.close();
});
