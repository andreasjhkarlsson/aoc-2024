
export function splitIntoLines(str: string) {
    return str.split("\n");
}


export function reverse(str: string) {
    let res = "";
    for (let i=0;i<str.length;i++) {
        res = str[i] + res;
    }
    return res;
}