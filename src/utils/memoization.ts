export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache: { [key: string]: ReturnType<T> } = {};

    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);

        if (key in cache) return cache[key];

        const value = fn(...args);

        cache[key] = value;

        return value;
    }) as T;
}