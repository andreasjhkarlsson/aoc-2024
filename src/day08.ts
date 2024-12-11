import { splitIntoLines } from "./utils/string";

type Antenna = {
    pos: [number, number],
    frequency: string
};

type Map = {
    width: number;
    height: number;
    antennae: Antenna[];
};

function readMap(input: string) {
    const lines = splitIntoLines(input);

    const map: Map = {
        width: lines[0].length,
        height: lines.length,
        antennae: []
    };

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const loc = lines[y][x];
            if (loc !== ".") {
                map.antennae.push({ pos: [x, y], frequency: loc });
            }
        }
    }

    return map;
}

function* findAntennaPairs(map: Map) {
    for (let i = 0; i < map.antennae.length - 1; i++) {
        const antennaA = map.antennae[i];
        for (let j = i + 1; j < map.antennae.length; j++) {
            const antennaB = map.antennae[j];
            if (antennaA.frequency === antennaB.frequency) {
                yield [antennaA, antennaB];
            }
        }
    }
}

function inBounds([x, y]: [number, number], map: Map) {
    return x >= 0 && x < map.width && y >= 0 && y < map.height;
}

function* findAntiNodesInDirection([x,y]: [number, number], [dx,dy]: [number, number], map: Map, limit?: number) {
    do {
        x += dx;
        y += dy;
        if (!inBounds([x,y], map))
            break;
        yield [x,y];

    } while (limit ? --limit: true);
}

function* findAntiNodes(map: Map) {
    for (const [{ pos: [x1, y1] }, { pos: [x2, y2] }] of findAntennaPairs(map)) {
        yield* findAntiNodesInDirection([x1,y1], [x1-x2,y1-y2], map, 1);
        yield* findAntiNodesInDirection([x2,y2], [-(x1-x2),-(y1-y2)], map, 1);
    }
}

function* findHarmonicAntiNodes(map: Map) {
    for (const [{ pos: [x1, y1] }, { pos: [x2, y2] }] of findAntennaPairs(map)) {
        yield* findAntiNodesInDirection([x1,y1], [-(x1 - x2), -(y1 - y2)],map);
        yield* findAntiNodesInDirection([x2,y2],[x1-x2,y1-y2],map);
    }
}

function* removeDuplicates(antiNodes: Generator<number[]>) {
    const set = new Set<string>();
    for (const antiNode of antiNodes) {
        const nodeId = antiNode.join(",");
        if (!set.has(nodeId)) {
            yield antiNode;
            set.add(nodeId);
        }
    }
}

export default function (input: string): [number, number] {
    const map = readMap(input);

    const part1 = Array.from(removeDuplicates(findAntiNodes(map))).length;
    const part2 = Array.from(removeDuplicates(findHarmonicAntiNodes(map))).length;

    return [part1, part2];
}