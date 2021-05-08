import { Badge, Empty, Layout, Row, Col, Radio } from "antd";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";

import { headerParams } from "features/header";
import { BookCard, BookRowCard } from "entities/book";
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

const viewTypes = [
    { key: "grid", Icon: AppstoreOutlined },
    { key: "list", Icon: BarsOutlined },
];

// eslint-disable-next-line max-lines-per-function
const CatalogContent = () => {
    const filters = useFilters();
    const booksQuery = fapi.books.getList(filters);
    const vtParam = catalogParams.useViewType();

    // FIXME: add later ListView
    // FIXME: Layout.Content?
    return (
        <Layout>
            <section className={styles.toolbar}>
                <Row className={styles.toolbarSort}>
                    <b className={styles.toolbarSortLabel}>Сортировать по:</b>
                    <ul className={styles.toolbarSortList}>
                        <li className={styles.toolbarSortListItem}>по популярности</li>
                        <li className={styles.toolbarSortListItem}>по цене аренды</li>
                        <li className={styles.toolbarSortListItem}>по сроку аренды</li>
                        <li className={styles.toolbarSortListItem}>по новизне</li>
                    </ul>
                </Row>
                <Radio.Group
                    value={vtParam.viewType}
                    onChange={(e) => vtParam.setViewType(e.target.value)}
                    className={styles.toolbarViews}
                    buttonStyle="solid"
                >
                    {viewTypes.map((vt) => (
                        <Radio.Button
                            key={vt.key}
                            value={vt.key}
                            className={styles.toolbarViewsItem}
                        >
                            <vt.Icon style={{ fontSize: 20 }} />
                        </Radio.Button>
                    ))}
                </Radio.Group>
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
                                    {vtParam.isList && <BookRowCard data={b} size="large" />}
                                </Badge.Ribbon>
                            </Col>
                        );
                    })}
                </Row>
                {!booksQuery.length && (
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
