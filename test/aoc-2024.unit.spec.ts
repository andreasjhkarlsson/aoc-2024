

import { default as day1 } from "../src/day01"
import { day, solveChallenge, verifySampleInput } from "./framework";

before(() => console.log("Advent of Code 2024 🎄"));

day(1, () => {
    verifySampleInput("day01.sample.input", [11,31], day1);
    solveChallenge("day01.input", day1);
});