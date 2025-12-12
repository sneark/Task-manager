export abstract class Maybe<T> {
    static just<T>(a: T): Maybe<T> {
        return new Just(a);
    }

    static nothing<T>(): Maybe<T> {
        return new Nothing<T>();
    }

    static fromNullable<T>(a: T | null | undefined): Maybe<T> {
        return a !== null && a !== undefined ? Maybe.just(a) : Maybe.nothing();
    }

    static of<T>(a: T): Maybe<T> {
        return Maybe.just(a);
    }

    abstract map<U>(f: (value: T) => U): Maybe<U>;
    abstract chain<U>(f: (value: T) => Maybe<U>): Maybe<U>;
    abstract getOrElse(other: T): T;
    abstract filter(f: (value: T) => boolean): Maybe<T>;
    abstract get isJust(): boolean;
    abstract get isNothing(): boolean;
}

export class Just<T> extends Maybe<T> {
    private _value: T;

    constructor(value: T) {
        super();
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    map<U>(f: (value: T) => U): Maybe<U> {
        return Maybe.fromNullable(f(this._value));
    }

    chain<U>(f: (value: T) => Maybe<U>): Maybe<U> {
        return f(this._value);
    }

    getOrElse(_other: T): T {
        return this._value;
    }

    filter(f: (value: T) => boolean): Maybe<T> {
        return f(this._value) ? this : Maybe.nothing();
    }

    get isJust(): boolean {
        return true;
    }

    get isNothing(): boolean {
        return false;
    }

    toString(): string {
        return `Maybe.Just(${this._value})`;
    }
}

export class Nothing<T> extends Maybe<T> {
    map<U>(_f: (value: T) => U): Maybe<U> {
        return new Nothing<U>();
    }

    chain<U>(_f: (value: T) => Maybe<U>): Maybe<U> {
        return new Nothing<U>();
    }

    get value(): never {
        throw new TypeError("Nie można pobrać wartości z Nothing!");
    }

    getOrElse(other: T): T {
        return other;
    }

    filter(_f: (value: T) => boolean): Maybe<T> {
        return this;
    }

    get isJust(): boolean {
        return false;
    }

    get isNothing(): boolean {
        return true;
    }

    toString(): string {
        return 'Maybe.Nothing';
    }
}
