import { default as day1 } from "../src/day01"
import { default as day2 } from "../src/day02"
import { default as day3 } from "../src/day03"
import { default as day4 } from "../src/day04"
import { default as day5 } from "../src/day05"
import { default as day6 } from "../src/day06"
import { default as day7 } from "../src/day07"
import { default as day8 } from "../src/day08"
import { default as day9 } from "../src/day09"
import { day, solveChallenge, verifySampleInput } from "./framework";

before(() => console.log("Advent of Code 2024 🎄"));

day(1, () => {
    verifySampleInput("day01.sample.input", [11, 31], day1);
    solveChallenge("day01.input", day1);
});

day(2, () => {
    verifySampleInput("day02.sample.input", [2, 4], day2);
    solveChallenge("day02.input", day2);
});

day(3, () => {
    verifySampleInput("day03.sample.input", [161, 48], day3);
    solveChallenge("day03.input", day3);
});

day(4, () => {
    verifySampleInput("day04.sample.input", [18, 9], day4);
    solveChallenge("day04.input", day4);
});

day(5, () => {
    verifySampleInput("day05.sample.input", [143, 123], day5);
    solveChallenge("day05.input", day5);
});

day(6, () => {
    verifySampleInput("day06.sample.input", [41, 6], day6);
    solveChallenge("day06.input", day6);
});

day(7, () => {
    verifySampleInput("day07.sample.input", [3749, 11387], day7);
    solveChallenge("day07.input", day7);
});

day(8, () => {
    verifySampleInput("day08.sample.input", [14, 34], day8);
    solveChallenge("day08.input", day8);
});

day(9, () => {
    verifySampleInput("day09.sample.input", [1928, 2858], day9);
    solveChallenge("day09.input", day9);
});