import { splitIntoLines } from "./utils/string";

type Calibration = {
    result: number,
    operands: number[]
};

type Operator = (a: number, b: number) => number;

function add(a: number, b: number) {
    return a+b;
}

function multiply(a: number, b: number) {
    return a*b;
}

function concat(a: number, b: number) {
    return a * Math.pow(10, Math.floor(Math.log10(b)) + 1) + b;
}

function solve(target: number, operands: number[], operators: Operator[], acc?: number) {
    if (acc === undefined)
        return solve(target, operands.slice(1), operators, operands[0]);

    if (operands.length === 0)
        return acc === target;

    if (acc >= target)
        return false;

    for (const operator of operators) {
        if (solve(target, operands.slice(1), operators, operator(acc, operands[0])))
            return true;
    }

    return false;
}

export default function(input: string): [number, number] {

    const lines = splitIntoLines(input);

    const calibrations: Calibration[] = [];

    for (const line of lines) {
        const splitted = line.split(": ");

        calibrations.push({
            result: parseInt(splitted[0]),
            operands: splitted[1].split(" ").map((s) => parseInt(s))
        });
    }

    let solveable = calibrations.filter((c) => solve(c.result, c.operands, [add, multiply]))
    const part1 = solveable.sumBy((c) => c.result);

    solveable = calibrations.filter((c) => solve(c.result, c.operands, [add,multiply,concat]));
    const part2 = solveable.sumBy((c) => c.result);

    return [part1,part2];
}