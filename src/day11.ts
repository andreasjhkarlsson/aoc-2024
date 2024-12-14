import { memoize } from "./utils/memoization";

function digits(n: number) {
    return Math.floor(Math.log10(n)) + 1;
}

function splitDigits(n: number): [number, number] {
    const factor = 10 ** (digits(n) / 2);
    return [Math.floor(n / factor), n % factor];
}

const intelliBlink = memoize((engraving: number, times: number): number => {

    if (times === 0) return 1;

    if (engraving === 0)
        return intelliBlink(1, times - 1);

    if (digits(engraving) % 2 === 0) {
        const [left, right] = splitDigits(engraving);
        return intelliBlink(left, times - 1) + intelliBlink(right, times - 1);
    }

    return intelliBlink(engraving * 2024, times - 1);
});

function readStones(input: string) {
    return input.split(" ").map(s => parseInt(s));
}

export default function(input: string): [number, number] {

    const stones = readStones(input);

    let part1 = 0;
    let part2 = 0;
    for (const stone of stones) {
        part1 += intelliBlink(stone, 25);
        part2 += intelliBlink(stone, 75);
    }

    return [part1, part2];
}