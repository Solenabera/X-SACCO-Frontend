/**
 * Loan Amortization Calculator Utility for SACCO System
 * Supports both Reducing Balance (PMT formula) and Flat Rate methods.
 */

export const calculateAmortizationSchedule = ({
    principal = 100000,
    annualInterestRate = 12, // e.g. 12%
    tenureMonths = 12,
    method = 'Reducing Balance', // 'Reducing Balance' | 'Flat Rate'
    startDate = new Date()
}) => {
    const schedule = [];
    const monthlyRate = (annualInterestRate / 100) / 12;

    let balance = Number(principal);
    let totalInterestPaid = 0;

    if (method === 'Reducing Balance') {
        // PMT = P * r * (1 + r)^n / ((1 + r)^n - 1)
        const pmt = monthlyRate > 0
            ? (balance * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1)
            : balance / tenureMonths;

        for (let m = 1; m <= tenureMonths; m++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = Math.min(pmt - interestPayment, balance);
            balance = Math.max(0, balance - principalPayment);
            totalInterestPaid += interestPayment;

            const pmtDate = new Date(startDate);
            pmtDate.setMonth(pmtDate.getMonth() + m);

            schedule.push({
                month: m,
                date: pmtDate.toISOString().slice(0, 10),
                totalPayment: Math.round((principalPayment + interestPayment) * 100) / 100,
                principalPayment: Math.round(principalPayment * 100) / 100,
                interestPayment: Math.round(interestPayment * 100) / 100,
                remainingBalance: Math.round(balance * 100) / 100,
                cumulativeInterest: Math.round(totalInterestPaid * 100) / 100,
            });
        }
    } else {
        // Flat Rate Method: Fixed interest every month = Principal * monthlyRate
        const monthlyInterest = balance * monthlyRate;
        const monthlyPrincipal = balance / tenureMonths;
        const monthlyPmt = monthlyPrincipal + monthlyInterest;

        for (let m = 1; m <= tenureMonths; m++) {
            balance = Math.max(0, balance - monthlyPrincipal);
            totalInterestPaid += monthlyInterest;

            const pmtDate = new Date(startDate);
            pmtDate.setMonth(pmtDate.getMonth() + m);

            schedule.push({
                month: m,
                date: pmtDate.toISOString().slice(0, 10),
                totalPayment: Math.round(monthlyPmt * 100) / 100,
                principalPayment: Math.round(monthlyPrincipal * 100) / 100,
                interestPayment: Math.round(monthlyInterest * 100) / 100,
                remainingBalance: Math.round(balance * 100) / 100,
                cumulativeInterest: Math.round(totalInterestPaid * 100) / 100,
            });
        }
    }

    const totalRepaymentAmount = Number(principal) + totalInterestPaid;

    return {
        principal: Number(principal),
        annualInterestRate: Number(annualInterestRate),
        tenureMonths: Number(tenureMonths),
        method,
        schedule,
        totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
        totalRepaymentAmount: Math.round(totalRepaymentAmount * 100) / 100,
        monthlyPaymentAvg: schedule.length > 0 ? schedule[0].totalPayment : 0,
    };
};
