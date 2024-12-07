import { splitIntoLines } from "./utils/string";

type PageOrderRule = [number, number];
type Update = number[];

type Graph = {[id: number]: Edge};
type Edge = { val: number, deps: number[]};

function isSorted(update: Update, graph: Graph) {

    const printed: number[] = [];

    for (const page of update) {
        const edge = graph[page];

        if (edge) {
            for (const alreadyPrinted of printed) {
                if (edge.deps.includes(alreadyPrinted)) return false;
            }
        }

        printed.push(page);
    }

    return true;
}

function resortUpdate(update: Update, graph: Graph) {
    let printed: number[] = [];

    for (const page of update) {

        const edge = graph[page];

        if (edge) {
            let inserted = false;
            for (const alreadyPrinted of printed) {
                if (edge.deps.includes(alreadyPrinted)) {
                    inserted = true;
                    // If we found a conflict, simply insert before conflict.
                    printed.splice(printed.indexOf(alreadyPrinted), 0, page);
                    break;
                }
            }
            if (inserted) continue;
        }

        printed.push(page);
    }

    return printed;    
}

function buildGraph(rules: PageOrderRule[]) {
    const graph: Graph = {};

    for (const rule of rules) {
        let edge = graph[rule[0]];
        if (edge == undefined) {
            edge = { val: rule[0], deps: []}
            graph[rule[0]] = edge;
        }
        edge.deps.push(rule[1]);
    }

    return graph;
}

function parseInput(input: string): [PageOrderRule[], Update[]] {
    const lines = splitIntoLines(input);

    const rules: PageOrderRule[] = [];
    const updates: Update[] = [];

    let readMode: "rules"|"updates" = "rules";
    for (const line of lines) {
        if (line === "") {
            readMode = "updates";
            continue;
        } 
        switch (readMode) {
            case "rules":
                rules.push(line.split("|").map((s) => parseInt(s)) as PageOrderRule);
                break;
            case "updates":
                updates.push(line.split(",").map((s) => parseInt(s)));
                break;
        }
    }

    return [rules, updates];
}

export default function(input: string): [number, number] {

    const [rules, updates] = parseInput(input);

    const graph = buildGraph(rules);
    
    let part1 = 0;
    let part2 = 0;
   
    for (const update of updates) {
        if (isSorted(update, graph)) {
            part1 += update.middle();
        } else {
            part2 += resortUpdate(update, graph).middle();
        }
    }

    return [part1, part2];
}