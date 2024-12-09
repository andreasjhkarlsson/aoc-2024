
import { splitIntoLines } from "./utils/string";

type GuardDirection = "U" | "L" | "R" | "D";

type Tile = "." | "#" | GuardDirection | "X";

export class GuardSet extends Set{
    add([x,y,d]: [number, number, GuardDirection]){
      return super.add(x << 24 | y << 16 | d.codePointAt(0))
    }
    has([x,y,d]){
      return super.has(x << 24 | y << 16 | d.codePointAt(0));
    }
  }

type State = {
    map: Tile[][];
    guard: [number, number, GuardDirection];
    guardHistory: Set<[number, number, GuardDirection]>;
}

function turn(guard: GuardDirection): GuardDirection {
    switch (guard) {
        case "U": return "R";
        case "R": return "D";
        case "D": return "L";
        case "L": return "U";
    }
}

function direction(guard:GuardDirection) {
    switch (guard) {
        case "U": return [0,-1];
        case "R": return [1,0];
        case "D": return [0,1];
        case "L": return [-1,0];
    }
}

function outOfBounds([x,y]: [number, number], map: Tile[][]) {
    return !(x>=0 && x<map[0].length && y>=0 && y<map.length);
}

function guardLeft(state: State) {
    return outOfBounds([state.guard[0], state.guard[1]], state.map);
}

function stepGuard(state: State) {

    if (guardLeft(state) || isLooping(state)) return;
    
    const [x,y,facing] = state.guard;

    const [dx,dy] = direction(facing);

    const [nx,ny] = [x + dx, y + dy];

    if (state.map[ny]?.[nx] === "#") {
        const newFacing = turn(facing);
        state.guard[2] = newFacing;
        stepGuard(state);
    } else {
        state.map[y][x] = "X";
        state.guardHistory.add([x,y,facing]);
        if (!outOfBounds([nx,ny], state.map))
            state.map[ny][nx] = facing;
        state.guard = [nx,ny, facing];
    }
}

function visitedTileCount(state: State) {
    return state.map.sumBy((row) => 
        row.sumBy((tile) => tile === "X" ? 1 : 0)
    );
}

function* visitedTiles(state: State) {
    for (let y=0;y<state.map.length;y++) {
        for (let x=0;x<state.map[y].length;x++) {
            if (state.map[y][x] === "X") yield [x,y];
        }
    }
}

function isLooping(state: State) {
    return state.guardHistory.has(state.guard);
}

function readMap(input: string) {
    const lines = splitIntoLines(input);
    const state: State = {map: [], guard: [0,0,"U"], guardHistory: new GuardSet()};
    for (let y=0;y<lines.length;y++) {
        state.map[y] = [];
        for (let x=0;x<lines.length;x++) {
            const c = lines[y][x];
            switch (c) {
                case "^":
                    state.guard = [x,y, "U"];
                    state.map[y][x] = "U";
                    break;
                case ".":
                case "#":
                    state.map[y][x] = c;
                    break;
                default: throw new Error("Invalid input");
            }
        }
    }

    return state;
}

function createsLoop(state: State, [x,y]: [number, number]) {
    if (state.map[y][x] === ".") {
        state.map[y][x] = "#";

        do {
            stepGuard(state);
            if (guardLeft(state)) break;
            if (isLooping(state)) {
                return true;
            }
        } while (true);
    }
    return false;
}

export default function(input: string): [number, number] {
    const state = readMap(input);

    while (!guardLeft(state)) stepGuard(state);

    const part1 = visitedTileCount(state);

    const originalPath = visitedTiles(state);

    let part2 = 0;

    for (const [x,y] of originalPath) {
        const state = readMap(input);
        if (createsLoop(state, [x,y])) part2++;
    }

    return [part1,part2];
}