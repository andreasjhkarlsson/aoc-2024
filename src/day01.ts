import "./utils/array";

export default function (input: string): [number, number] {
   
    const lines = input.split("\n");

    const lists = lines.map((line) => line.split("   ").map((s) => parseInt(s)))

    const listA = lists.map(([e,_]) => e).sort();
    const listB = lists.map(([_,e]) => e).sort();

    const diffs = listA.zip(listB).map(([a,b]) => Math.abs(a-b));

    const sumOfDiffs = diffs.sum();

    const similarityScore = listA.sumBy((a) => listB.instancesOf(a) * a);

    return [sumOfDiffs, similarityScore]
};