import { splitIntoLines } from "./utils/string";

function isNegative(num: number) {
    return num < 0;
}

function isPositive(num: number) {
    return num > 0;
}

function* dampenReport(report: number[]) {
    for (let i = 0; i < report.length; i++) {
        const dampened = [...report];
        dampened.splice(i, 1);
        yield dampened;
    }
}

function isValid(report: number[], dampen = false) {
    const diffs = report.pairwise().map(([a, b]) => a - b);
    if ((diffs.every(isNegative) || diffs.every(isPositive)) && !diffs.map((d) => Math.abs(d)).some((d) => d > 3))
        return true;
    
    if (dampen) {
        for (const dampened of dampenReport(report)) {
            if (isValid(dampened)) return true;
        }
    }

    return false;
}

export default function(input: string): [number, number] {
    const reports = splitIntoLines(input).map((rs) => rs.split(" ").map((s) => parseInt(s)));

    const validReports = reports.filter((r) => isValid(r)).length;

    const validDampenedReports = reports.filter((r) => isValid(r, true)).length;

    return [validReports,validDampenedReports]
}