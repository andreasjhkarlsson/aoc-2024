

import { default as day1 } from "../src/day01"
import { default as day2 } from "../src/day02"
import { day, solveChallenge, verifySampleInput } from "./framework";

before(() => console.log("Advent of Code 2024 🎄"));

day(1, () => {
    verifySampleInput("day01.sample.input", [11,31], day1);
    solveChallenge("day01.input", day1);
});

day(2, () => {
    verifySampleInput("day02.sample.input", [2,4], day2);
    solveChallenge("day02.input", day2);
});