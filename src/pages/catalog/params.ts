import { useRef } from "react";
import {
    DelimitedNumericArrayParam,
    StringParam,
    NumberParam,
    useQueryParam,
    withDefault,
} from "use-query-params";

// FIXME: fix delimiters
// FIXME: return back null default value?

/** @query Фильтрация: по автору */
export const useFilterByAuthor = () => {
    const [authors, setParam] = useQueryParam(
        "authors",
        withDefault(DelimitedNumericArrayParam, []),
    );

    // Реализуем отдельно, т.к. нужно скрывать параметр из URL
    const setAuthors: typeof setParam = (value) => {
        setParam(value?.length ? value : undefined);
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
        setParam(value?.length ? value : undefined);
    };

    // FIXME: types
    return { publishers: publishers as number[], setPublishers };
};

/** @query Фильтрация: по категории */
export const useFilterByCategory = () => {
    const [categories, setParam] = useQueryParam(
        "cat",
        withDefault(DelimitedNumericArrayParam, []),
    );

    // Реализуем отдельно, т.к. нужно скрывать параметр из URL
    const setCategories: typeof setParam = (value) => {
        setParam(value?.length ? value : undefined);
    };

    // FIXME: types
    return { categories: categories as number[], setCategories };
};

export const VIEW_TYPE = {
    grid: "grid" as const,
    list: "list" as const,
};

type ViewTypeValue = typeof VIEW_TYPE[keyof typeof VIEW_TYPE];

export const defaultViewType = VIEW_TYPE.grid;

/** @query Способ отображения */
export const useViewType = () => {
    const [viewType, setParam] = useQueryParam("vt", withDefault(StringParam, defaultViewType));

    const setViewType = (value: ViewTypeValue) => {
        setParam(value || defaultViewType);
    };

    const isGrid = viewType === "grid";
    const isList = viewType === "list";

    return { viewType: viewType as ViewTypeValue, setViewType, isGrid, isList };
};

export const MIN_PRICE = 50;
export const MAX_PRICE = 1000;

export const usePrices = () => {
    const [from, setFrom] = useQueryParam("pf", withDefault(NumberParam, MIN_PRICE));
    const [to, setTo] = useQueryParam("pt", withDefault(NumberParam, MAX_PRICE));
    // FIXME: type
    const timerRef = useRef<any>();

    // Обновляем не сразу, а с задержкой
    const setPrice = (from: number, to: number) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setFrom(from);
            setTo(to);
        }, 300);
    };

    return { from, to, setPrice };
};
