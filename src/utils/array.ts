import assert from "assert";

export {};

declare global {
    interface Array<T> {
        sum(): number;
        zip<U>(other: U[]): [T,U][];
        sumBy(fn: ((e: T) => number)): number;
        instancesOf(e: T): number;
    }
}

Array.prototype.sum = function (): number {
    return this.reduce((acc: number, val: number) => acc + val, 0);
};

Array.prototype.zip = function<T, U> (this: T[], other: U[]): [T,U][] {
    assert(this.length === other.length);
    return this.map((e,i) => [e, other[i]]);
};

Array.prototype.sumBy = function<T>(this: T[], fn: (e: T) => number) {
    return this.map(fn).sum();
}

Array.prototype.instancesOf = function<T>(this: T[], a: T) {
    return this.filter((b) => a === b).length;
}
