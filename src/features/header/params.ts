import { StringParam, useQueryParam, withDefault } from "use-query-params";

/** @query Поискоой запрос */
export const useSearchParam = () => {
    const [search, _setSearch] = useQueryParam("q", withDefault(StringParam, ""));

    const setSearch = (nextValue: string | undefined) => {
        _setSearch(nextValue || undefined);
    };

    return { search, setSearch };
};
