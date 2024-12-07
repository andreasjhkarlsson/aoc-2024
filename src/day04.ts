import { reverse, splitIntoLines } from "./utils/string";

function* coordinates(matrix: string[]) {
    for (let y=0;y<matrix.length;y++) {
        for (let x=0;x<matrix[y].length;x++)
            yield [x,y];
    }
}

function searchMatrixAt([x,y]: [number,number], subStr: string, matrix: string[], [dx,dy]: [number, number]) {
    for (let i=0;i<subStr.length;i++) {
        if (subStr[i] !== matrix[y+dy*i]?.[x + i*dx]) {
            return false;
        }
    }
    return true;
}

function searchMatrix(subStr: string, matrix: string[], [dx,dy]: [number, number]) {
    let sum = 0;

    for (let [x,y] of coordinates(matrix)) {
        if (searchMatrixAt([x,y], subStr, matrix, [dx,dy]))
            sum++;
    }
    
    return sum;
}


function searchCrosses(subStr: string, matrix: string[]) {
    let sum = 0;

    for (let [x,y] of coordinates(matrix)) {
        
        const downRight = searchMatrixAt([x,y], subStr, matrix, [1,1]) || 
                            searchMatrixAt([x,y], reverse(subStr), matrix, [1,1]);
        
        const leftDown = searchMatrixAt([x+2,y], subStr, matrix, [-1,1]) ||
                            searchMatrixAt([x+2,y], reverse(subStr), matrix, [-1,1]);

        if (downRight && leftDown) sum++;
    }
    
    return sum;
}

export default function(input: string): [number, number] {
    const lines = splitIntoLines(input);

    const ltr = searchMatrix("XMAS", lines, [1,0]);
    const rtl = searchMatrix("XMAS", lines, [-1,0]);

    const verticalDown = searchMatrix("XMAS", lines, [0, 1]);
    const verticalUp = searchMatrix("XMAS", lines,  [0, -1]);

    const diagonalDownRight = searchMatrix("XMAS", lines,[1, 1]);
    const diagonalUpRight = searchMatrix("XMAS", lines, [1, -1]);

    const diagonalDownLeft = searchMatrix("XMAS", lines, [-1, 1]);
    const diagonalUpLeft = searchMatrix("XMAS", lines, [-1, -1]);

    const part1 = ltr + rtl + verticalDown + verticalUp + diagonalDownRight + diagonalUpRight + diagonalDownLeft + diagonalUpLeft;

    const part2 = searchCrosses("MAS", lines);

    return [part1,part2];
}