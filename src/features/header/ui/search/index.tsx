import { useState } from "react";
import { AutoComplete, Input } from "antd";
import { useHistory } from "react-router-dom";

import type { AbstractBook } from "entities/types";
import * as fapi from "shared/fixtures";
import { useSearchParam } from "../../params";

const initialQuery = fapi.books.getAll();

const mapToOptions = (books: AbstractBook[]) =>
    books.map((book) => ({
        label: fapi.books.toString(book),
        value: String(book.id),
    }));

const useSearch = () => {
    const [query, setQuery] = useState<AbstractBook[]>(initialQuery);
    // !!! FIXME
    const [indexReset, updateReset] = useState(0);
    const params = useSearchParam();
    const history = useHistory();

    const hanldeAutocomplete = (search: string) => {
        const booksQuery = fapi.books.getList({ search });
        setQuery(booksQuery);
    };

    const handleSelect = (value: string) => {
        // FIXME: hardcoded
        history.push(`/book/${value}`);
        updateReset((indexReset + 1) % 10);
    };

    const handleSubmit = (search: string) => {
        params.setSearch(search);
    };

    return {
        query,
        hanldeAutocomplete,
        handleSelect,
        handleSubmit,
        indexReset,
        param: params.search,
    };
};

const HeaderSearch = () => {
    const search = useSearch();

    return (
        <AutoComplete
            // Для очищения инпута
            key={search.indexReset}
            defaultValue={search.param}
            // FIXME: refine later
            options={mapToOptions(search.query)}
            // FIXME: refine later
            style={{ width: 700 }}
            onSelect={search.handleSelect}
            onSearch={search.hanldeAutocomplete}
        >
            <Input.Search
                size="large"
                placeholder="Поиск книг"
                enterButton
                onSearch={search.handleSubmit}
                allowClear
            />
        </AutoComplete>
    );
};

export default HeaderSearch;
