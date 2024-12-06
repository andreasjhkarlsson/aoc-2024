
import { expect } from "chai";
import * as fs from "node:fs";

console.log("Advent of Code 2024 🎄");

export type Solver = (input: string) => [number, number];

function readInput(filename: string) {
    const buffer = fs.readFileSync(`data/${filename}`);
    return buffer.toString("utf8");
}

export function day(day, fn: (this: Mocha.Suite) => void) {
    describe(`Day ${day}`, fn);
}

export function verifySampleInput(file, expectedSolution: [number, number], solver: Solver) {
    it("solves the sample input", () => {
        const input = readInput(file);
        const [part1, part2] = solver(input); 
        
        expect(part1).to.be.eq(expectedSolution[0], "Part 1 of sample solution is not correct");
        expect(part2).to.be.eq(expectedSolution[1], "Part 2 of sample solution is not correct");


        console.log(`\tSolution for part 1: ${part1}`);
        console.log(`\tSolution for part 2: ${part2}`);
    });
}

export function solveChallenge(file, solver: Solver) {
    it("outputs the solution", () => {
        const input = readInput(file);
        const [part1, part2] = solver(input); 

        console.log(`\tSolution for part 1: ${part1}`);
        console.log(`\tSolution for part 2: ${part2}`);     
    });
}