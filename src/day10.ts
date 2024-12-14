import { splitIntoLines } from "./utils/string";

type Map = number[][];

type Position = [number, number];

function readMap(input: string) {
    return splitIntoLines(input).map(l => Array.from(l).map(h => parseInt(h)));
}

function neighbors([x,y]: Position, map: Map) {
    const width = map[0].length;
    const height = map.length;
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ].filter(([x, y]) => 
        x >= 0 && x < width && y >= 0 && y < height
    );
}

function* findElevationPoints(map: Map, elevation: number) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === elevation) yield [x,y] as Position;
        }
    }
}

const trailheads = (map: Map) => findElevationPoints(map, 0);
const trailtails = (map: Map) => findElevationPoints(map, 9);

function pathsTo([currentX, currentY]: Position, [targetX, targetY]: Position, map: Map) {
    const currentHeight = map[currentY][currentX];
    let paths = 0;
    for (const [x, y] of neighbors([currentX, currentY], map)) {
        const nextHeight = map[y][x];
        const diff = nextHeight - currentHeight;
        if (diff === 1) {
            if (x === targetX && y === targetY)
                return 1;
            paths += pathsTo([x, y], [targetX, targetY], map);
        }
    }

    return paths;
}

function score(trailhead: Position, map: Map) {
    return Array.from(trailtails(map)).filter(trailtail => pathsTo(trailhead, trailtail, map) > 0).length;
}

function rating(trailhead: Position, map: Map) {
    return Array.from(trailtails(map)).sumBy(trailtail => pathsTo(trailhead, trailtail, map));
}

export default function(input: string): [number, number] {

    const map = readMap(input);

    let part1 = 0;
    for (const trailhead of trailheads(map)) {
        part1 += score(trailhead, map);
    }

    let part2 = 0;
    for (const trailhead of trailheads(map)) {
        part2 += rating(trailhead, map);
    }    

    return [part1, part2];
}