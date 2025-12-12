export const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T): T => {
    return fns.reduce((acc, fn) => fn(acc), value);
};
