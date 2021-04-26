import { useState } from "react";
import { AutoComplete } from "antd";

import type { AbstractBook } from "entities/types";
// FIXME: resolve
// eslint-disable-next-line no-restricted-imports
import alert from "shared/lib/alert";
import * as fapi from "shared/fixtures";

const initialQuery = fapi.books.getAll();

const mapToOptions = (books: AbstractBook[]) =>
    books.map((book) => ({
        value: fapi.books.toString(book),
    }));

// TODO: add query-params
const HeaderSearch = () => {
    const [query, setQuery] = useState<AbstractBook[]>(initialQuery);

    const onSearch = (search: string) => {
        const booksQuery = fapi.books.getList({ search });
        setQuery(booksQuery);
    };
    const onSelect = (option: string) => {
        alert.info(option);
    };

    return (
        <AutoComplete
            // FIXME: refine later
            options={mapToOptions(query)}
            // FIXME: refine later
            style={{ width: 600 }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Поиск книг"
        />
    );
};

export default HeaderSearch;
