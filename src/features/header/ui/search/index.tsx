import { useState } from "react";
import { AutoComplete, Input, Col, Row } from "antd";
import { BookFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import type { AbstractBook } from "entities/types";
import * as fapi from "shared/fixtures";
import { useSearchParam } from "../../params";
import styles from "./styles.module.scss";

const initialQuery = fapi.books.getAll();

const mapToOptions = (books: AbstractBook[]) =>
    books.map((book) => ({
        value: String(book.id),
        label: (
            <Row align="middle">
                <Col span={2}>
                    <BookFilled className={styles.labelIcon} />
                </Col>
                <Col className={styles.labelDetails}>
                    <span>{fapi.books.getShortname(book)}</span>
                    <span className={styles.labelDetailsDescription}>
                        {book.publicationYear}, {book.publishingHouse.name}
                    </span>
                </Col>
            </Row>
        ),
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
            notFoundContent="Ничего не найдено - попробуйте расширенный поиск"
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
