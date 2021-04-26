import { DelimitedNumericArrayParam, useQueryParam, withDefault } from "use-query-params";

// FIXME: fix delimiters

/** @query Фильтрация: по автору */
export const useFilterByAuthor = () => {
    const [authors, setParam] = useQueryParam(
        "authors",
        withDefault(DelimitedNumericArrayParam, []),
    );

    // Реализуем отдельно, т.к. нужно скрывать параметр из URL
    const setAuthors: typeof setParam = (value) => {
        setParam(value || undefined);
    };

    // FIXME: types
    return { authors: authors as number[], setAuthors };
};

/** @query Фильтрация: по издателю */
export const useFilterByPublisher = () => {
    const [publishers, setParam] = useQueryParam(
        "pub",
        withDefault(DelimitedNumericArrayParam, []),
    );

    // Реализуем отдельно, т.к. нужно скрывать параметр из URL
    const setPublishers: typeof setParam = (value) => {
        setParam(value || undefined);
    };

    // FIXME: types
    return { publishers: publishers as number[], setPublishers };
};
