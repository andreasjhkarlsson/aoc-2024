import { expect } from "chai";
import * as fs from "node:fs";

export type Solver = (input: string) => [number, number];

function readInput(filename: string) {
    const buffer = fs.readFileSync(`data/${filename}`);
    return buffer.toString("utf8");
}

export function day(day, fn: () => void) {
    describe(`Day ${day}`, function(this: Mocha.Suite) {
        this.timeout(60000);
        fn();
    });
}

export function verifySampleInput(file: string | [string,string], expectedSolution: [number, number], solver: Solver) {
    it("solves the sample input", () => {

        let part1, part2;
        if (Array.isArray(file)) {
            const input1 = "";
        } else {
            const input = readInput(file);
            [part1, part2] = solver(input); 
        }
        
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
