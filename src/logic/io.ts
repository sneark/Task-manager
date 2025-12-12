import { Maybe } from './monads';

export const safeParseJSON = <T>(json: string | null): Maybe<T> => {
    if (json === null) {
        return Maybe.nothing();
    }
    try {
        const parsed = JSON.parse(json);
        return Maybe.just(parsed);
    } catch {
        return Maybe.nothing();
    }
};
