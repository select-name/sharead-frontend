import { Badge, Empty, Layout, Row, Col, Radio } from "antd";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";

import { headerParams, Cart, Fav, Reserve } from "features";
import { BookCard, BookRowCard } from "entities/book";
import { orderLib } from "entities/order";
import { fakeApi } from "shared/api";
import type { AbstractBook } from "shared/api";
import * as catalogParams from "../params";
import styles from "./styles.module.scss";

const useFilters = () => {
    const params = headerParams.useSearchParam();
    const { authors } = catalogParams.useFilterByAuthor();
    const { publishers } = catalogParams.useFilterByPublisher();
    const { categories } = catalogParams.useFilterByCategory();
    const prices = catalogParams.usePrices();
    const tariffDays = catalogParams.useTariff().tariff;

    return {
        authors,
        publishers,
        categories,
        prices,
        search: params.search,
        // !!! FIXME: simplify!!!
        tariff: {
            days: tariffDays,
            getBookDuration: (b: AbstractBook) => orderLib.getRentInfo(b.id).duration,
        },
    };
};

const viewTypes = [
    { key: "grid", Icon: AppstoreOutlined },
    { key: "list", Icon: BarsOutlined },
];
// eslint-disable-next-line max-lines-per-function
const CatalogContent = () => {
    const filters = useFilters();
    const booksQuery = fakeApi.books.getList(filters);
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
                    {booksQuery.map((b) => (
                        <BookItem key={b.id} data={b} />
                    ))}
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

// eslint-disable-next-line max-lines-per-function
const BookItem = ({ data }: { data: AbstractBook }) => {
    const vtParam = catalogParams.useViewType();
    const popular = fakeApi.books.isPopular(data);
    const rent = orderLib.getRentInfo(data.id);

    if (rent.status === "OUT_STOCK") return null;

    const ribbonText =
        rent.status === "RESERVABLE" ? "Можно забронировать" : popular ? "Популярное" : "";
    const ribbonColor = rent.status === "RESERVABLE" ? "gray" : popular ? "magenta" : "";
    const ribbonStyle = { display: ribbonText ? "block" : "none" };
    const span = vtParam.isGrid ? 8 : 24;
    return (
        <Col span={span}>
            <Badge.Ribbon text={ribbonText} style={ribbonStyle} color={ribbonColor}>
                {vtParam.isGrid && (
                    <BookCard
                        data={data}
                        asSecondary={rent.status === "RESERVABLE"}
                        actions={[
                            <Fav.Actions.AddBookMini key="fav" bookId={data.id} />,
                            rent.status === "RENTABLE" && (
                                <Cart.Actions.AddBookMini key="order" bookId={data.id} />
                            ),
                            rent.status === "RESERVABLE" && (
                                <Reserve.Actions.ReserveBookMini key="reserve" bookId={data.id} />
                            ),
                        ].filter(Boolean)}
                    />
                )}
                {vtParam.isList && (
                    <BookRowCard
                        data={data}
                        asSecondary={rent.status === "RESERVABLE"}
                        size="large"
                        actions={
                            <>
                                <Fav.Actions.AddBook bookId={data.id} />
                                {rent.status === "RENTABLE" && (
                                    <Cart.Actions.AddBook bookId={data.id} />
                                )}
                                {rent.status === "RESERVABLE" && (
                                    <Reserve.Actions.ReserveBook bookId={data.id} />
                                )}
                            </>
                        }
                    />
                )}
            </Badge.Ribbon>
        </Col>
    );
};

export default CatalogContent;
