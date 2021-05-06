import { useState } from "react";
import { AutoComplete, Input } from "antd";
import { useHistory, useLocation } from "react-router-dom";

import type { AbstractBook } from "entities/types";
import { BookRow } from "entities/book";
import * as fapi from "shared/fixtures";
import { useSearchParam } from "../../params";

// const initialQuery = fapi.books.getAll();
const initialQuery: AbstractBook[] = [];

// !!! FIXME
const CATALOG_ROUTE = "/catalog";

const mapToOptions = (books: AbstractBook[]) =>
    books.map((book) => ({
        value: String(book.id),
        label: <BookRow data={book} size="small" titleAsLink={false} />,
    }));

const TOOLTIP = {
    MIN_LENGTH: "Уточните запрос (минимум 3 символа)",
    NOT_FOUND: "Ничего не найдено - попробуйте расширенный поиск",
};

const useSearch = () => {
    const [query, setQuery] = useState<AbstractBook[]>(initialQuery);
    // !!! FIXME
    const [indexReset, updateReset] = useState(0);
    const [tooltip, setTooltip] = useState(TOOLTIP.MIN_LENGTH);
    const params = useSearchParam();
    const history = useHistory();
    const location = useLocation();

    // FIXME: Сбрасывать инпут, если не страница каталога
    const isCatalogPage = location.pathname === CATALOG_ROUTE;

    const hanldeAutocomplete = (search: string) => {
        const isNotEnoughLength = search.length < 3;
        setTooltip(isNotEnoughLength ? TOOLTIP.MIN_LENGTH : TOOLTIP.NOT_FOUND);
        // FIXME: hardcoded
        if (isNotEnoughLength) return setQuery(initialQuery);

        const booksQuery = fapi.books.getList({ search });
        setQuery(booksQuery);
    };

    const handleSelect = (value: string) => {
        // FIXME: hardcoded
        history.push(`/book/${value}`);
        updateReset((indexReset + 1) % 10);
    };

    const handleSubmit = (search: string) => {
        if (isCatalogPage) {
            return params.setSearch(search);
        }
        // FIXME: hardcoded
        history.push(`${CATALOG_ROUTE}?q=${search}`);
    };

    return {
        query,
        tooltip,
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
            style={{ width: "100%" }}
            onSelect={search.handleSelect}
            onSearch={search.hanldeAutocomplete}
            notFoundContent={search.tooltip}
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
