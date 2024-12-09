

import { default as day1 } from "../src/day01"
import { default as day2 } from "../src/day02"
import { default as day3 } from "../src/day03"
import { default as day4 } from "../src/day04"
import { default as day5 } from "../src/day05"
import { default as day6 } from "../src/day06"
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

day(3, () => {
    verifySampleInput("day03.sample.input", [161,48], day3);
    solveChallenge("day03.input", day3);
});

day(4, () => {
    verifySampleInput("day04.sample.input", [18,9], day4);
    solveChallenge("day04.input", day4);
});

day(5, () => {
    verifySampleInput("day05.sample.input", [143,123], day5);
    solveChallenge("day05.input", day5);
});

day(6, () => {
    verifySampleInput("day06.sample.input", [41,6], day6);
    solveChallenge("day06.input", day6);
});