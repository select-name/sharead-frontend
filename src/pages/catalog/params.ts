import { useRef } from "react";
import {
    DelimitedNumericArrayParam,
    StringParam,
    NumberParam,
    useQueryParam,
    withDefault,
    BooleanParam,
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

export const defaultViewType = VIEW_TYPE.list;

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

// FIXME: move to entities / config / constants?
export const PRICES = {
    MIN: 50,
    MAX: 1000,
};
export const usePrices = () => {
    const [from, setFrom] = useQueryParam("pf", withDefault(NumberParam, PRICES.MIN));
    const [to, setTo] = useQueryParam("pt", withDefault(NumberParam, PRICES.MAX));
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

export const TARIFFS = {
    T7: 7,
    T14: 14,
    T30: 30,
};

export const useTariff = () => {
    const [tariff, setParam] = useQueryParam("td", withDefault(NumberParam, TARIFFS.T7));
    // FIXME: type
    const timerRef = useRef<any>();

    // Обновляем не сразу, а с задержкой
    const setTariff = (tariff: number) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setParam(tariff);
        }, 300);
    };

    return { tariff, setTariff };
};

const DEFAULT_EXISTS_ONLY = false;

export const useExistsOnly = () => {
    const [existsOnly, setParam] = useQueryParam(
        "eo",
        withDefault(BooleanParam, DEFAULT_EXISTS_ONLY),
    );

    const setExistsOnly: typeof setParam = (value) => {
        setParam(value || DEFAULT_EXISTS_ONLY);
    };
    return { existsOnly, setExistsOnly };
};

const DEFAULT_SORTING = 4;
export const SORTINGS = {
    1: "по популярности",
    2: "по цене аренды",
    3: "по сроку аренды",
    4: "по новизне",
};
export const useSorting = () => {
    const [sorting, setParam] = useQueryParam("ob", withDefault(NumberParam, DEFAULT_SORTING));

    // Обновляем не сразу, а с задержкой
    const setSorting = (value: number) => {
        setParam(value === DEFAULT_SORTING ? undefined : value);
    };

    return { sorting, setSorting };
};
