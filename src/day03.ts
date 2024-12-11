type Mul = { type: "mul", operands: [number, number]};
type Do = { type: "do" };
type Dont = { type: "don't" };

type Instruction = Mul | Do | Dont;

function parseRegex<T>(input: string, regex: RegExp, fn: (matches: RegExpExecArray) => T): [T, string] | undefined {
    const match = regex.exec(input);
    if (match !== null) 
        return [fn(match), input.substring(match[0].length)];
    return undefined;
}

function parseMul(input: string): [Mul, string] | undefined {
    const regex = /^mul\((\d+),(\d+)\)/g;
    return parseRegex<Mul>(input, regex, (match) => ({type: "mul" as const, operands: [parseInt(match[1]), parseInt(match[2])]}));
}

function parseDo(input: string): [Do, string] {
    if (input.startsWith("do()"))
        return [{type: "do"}, input.substring(4)];
    return undefined;
}

function parseDont(input: string): [Dont, string] {
    if (input.startsWith("don't()"))
        return [{type: "don't"}, input.substring(7)];
    return undefined;
}

function parse(input: string): Instruction[] {

    let results: Instruction[] = [];

    while (input.length >0) {
        const parsers = [parseMul, parseDont, parseDo];
        let matched = false;
        for (const parser of parsers) {
            const res = parser(input);
            if (res) {
                results.push(res[0]);
                input = res[1];
                matched = true;
                break;
            }
        } 
        if (!matched) input = input.substring(1);
    }

    return results;
}

export default function(input: string): [number, number] {

    const instructions: Instruction[] = parse(input);
    
    let part1 = 0;
    let part2 = 0;
    let enabled = true;
    for (const instruction of instructions) {
        switch (instruction.type) {
            case "do":
                enabled = true;
                break;
            case "don't":
                enabled = false;
                break;
            case "mul":
                const [a, b] = instruction.operands;
                part1 += a * b;
                if (enabled) part2 += a * b;
                break;
        }
    }
    
    return [part1, part2];
}