import { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";

import type { AbstractBook } from "entities/types";
// FIXME: resolve
// eslint-disable-next-line no-restricted-imports
import alert from "shared/lib/alert";
import * as fapi from "shared/fixtures";
import { useSearchParam } from "../../params";

const initialQuery = fapi.books.getAll();

const mapToOptions = (books: AbstractBook[]) =>
    books.map((book) => ({
        value: fapi.books.toString(book),
    }));

const useSearch = () => {
    const [query, setQuery] = useState<AbstractBook[]>(initialQuery);
    const params = useSearchParam();

    const hanldeAutocomplete = (search: string) => {
        const booksQuery = fapi.books.getList({ search });
        setQuery(booksQuery);
    };

    const handleSelect = (option: string) => {
        alert.info(option);
    };

    const handleSubmit = (search: string) => {
        params.setSearch(search);
    };

    // useEffect(() => {
    //     if (!params.search) return;
    //     handleSearch(params.search);
    // }, [params.search]);

    return {
        query,
        hanldeAutocomplete,
        handleSelect,
        handleSubmit,
        param: params.search,
    };
};

const HeaderSearch = () => {
    const search = useSearch();

    // FIXME: Не показывать сразу все опции?
    return (
        <AutoComplete
            // FIXME: refine later
            options={mapToOptions(search.query)}
            // FIXME: refine later
            style={{ width: 700 }}
            onSelect={search.handleSelect}
            onSearch={search.hanldeAutocomplete}
            defaultValue={search.param}
        >
            <Input.Search
                size="large"
                placeholder="Поиск книг"
                enterButton
                onSearch={search.handleSubmit}
            />
        </AutoComplete>
    );
};

export default HeaderSearch;
