import { Badge, Empty, Layout, Row, Col, Card } from "antd";

import { headerParams } from "features/header";
import { BookCard, BookRow } from "entities/book";
import * as fapi from "shared/fixtures";
import * as catalogParams from "../params";
import styles from "./styles.module.scss";

const useFilters = () => {
    const params = headerParams.useSearchParam();
    const { authors } = catalogParams.useFilterByAuthor();
    const { publishers } = catalogParams.useFilterByPublisher();
    const { categories } = catalogParams.useFilterByCategory();

    return { authors, publishers, categories, search: params.search };
};

// eslint-disable-next-line max-lines-per-function
const CatalogContent = () => {
    const filters = useFilters();
    const booksQuery = fapi.books.getList(filters);
    const vtParam = catalogParams.useViewType();

    // FIXME: add later ListView
    // FIXME: Layout.Content?
    return (
        <Layout>
            <section className={styles.sort}>
                <b className={styles.sortLabel}>Сортировать по:</b>

                <ul className={styles.sortList}>
                    <li className={styles.sortListItem}>по популярности</li>
                    <li className={styles.sortListItem}>по цене аренды</li>
                    <li className={styles.sortListItem}>по сроку аренды</li>
                    <li className={styles.sortListItem}>по новизне</li>
                </ul>
            </section>
            <section className={styles.catalog}>
                <Row justify="start" gutter={[20, 20]}>
                    {booksQuery.map((b) => {
                        const popular = fapi.books.isPopular(b);
                        const style = { display: popular ? "block" : "none" };
                        const span = vtParam.isGrid ? 8 : 24;

                        return (
                            <Col key={b.id} span={span}>
                                <Badge.Ribbon text="Популярное" style={style} color="magenta">
                                    {vtParam.isGrid && <BookCard data={b} />}
                                    {vtParam.isList && (
                                        <Card hoverable>
                                            <BookRow data={b} size="large" />
                                        </Card>
                                    )}
                                </Badge.Ribbon>
                            </Col>
                        );
                    })}
                </Row>
                {booksQuery.length === 0 && (
                    <Empty
                        className={styles.placeholder}
                        description="Не удалось ничего найти по вашему запросу"
                    />
                )}
            </section>
        </Layout>
    );
};

export default CatalogContent;
