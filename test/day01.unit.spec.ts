import { default as solve } from "../src/day01";
import { day, verifySampleInput, solveChallenge} from "./aoc-2024";

day(1, () => {
    verifySampleInput("day01.sample.input", [11,31], solve);
    solveChallenge("day01.input", solve);
});