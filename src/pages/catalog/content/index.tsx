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
                {/* <Row justify="start" gutter={[0, 10]} className={styles.grid}>
                    {booksQuery.map((b) => {
                        const popular = fapi.books.isPopular(b);
                        const style = { display: popular ? "block" : "none" };

                        return (
                            <Col span={8} key={b.id}>
                                <Badge.Ribbon
                                    text="Популярное"
                                    className={styles.gridItemRibbon}
                                    style={style}
                                    color="magenta"
                                >
                                    <BookCard data={b} className={styles.gridItem} />
                                </Badge.Ribbon>
                            </Col>
                        );
                    })}
                </Row> */}
                <Row justify="start" gutter={[0, 20]} className={styles.list}>
                    {booksQuery.map((b) => {
                        const popular = fapi.books.isPopular(b);
                        const style = { display: popular ? "block" : "none" };

                        return (
                            <Col key={b.id} span={24}>
                                <Badge.Ribbon text="Популярное" style={style} color="magenta">
                                    <Card hoverable>
                                        <BookRow data={b} size="large" />
                                    </Card>
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
