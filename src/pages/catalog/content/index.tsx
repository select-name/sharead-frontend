import { Card, Empty, Layout, Button } from "antd";
import { BookFilled, ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { headerParams } from "features/header";
import type { AbstractBook } from "entities/types";
// FIXME:
// eslint-disable-next-line no-restricted-imports
import alert from "shared/lib/alert";
import * as fapi from "shared/fixtures";
import * as catalogParams from "../params";
import styles from "./styles.module.scss";

const useFilters = () => {
    const { authors } = catalogParams.useFilterByAuthor();
    const { publishers } = catalogParams.useFilterByPublisher();

    return { authors, publishers };
};

const CatalogContent = () => {
    const params = headerParams.useSearchParam();
    const filters = useFilters();
    const booksQuery = fapi.books.getList({ search: params.search, ...filters });

    // FIXME: add later ListView
    return (
        <Layout.Content>
            <section className={styles.sort}>
                <b className={styles.sortLabel}>Сортировать по:</b>

                <ul className={styles.sortList}>
                    <li className={styles.sortListItem}>по популярности</li>
                    <li className={styles.sortListItem}>по цене аренды</li>
                    <li className={styles.sortListItem}>по сроку аренды</li>
                    <li className={styles.sortListItem}>по новизне</li>
                </ul>
            </section>
            <section className={styles.grid}>
                {booksQuery.map((b) => (
                    <BookCard key={b.id} data={b} />
                ))}
            </section>
            {booksQuery.length === 0 && (
                <Empty
                    className={styles.catalogPlaceholder}
                    description="Не удалось найти книги по вашему запросу"
                />
            )}
        </Layout.Content>
    );
};

// FIXME:
// eslint-disable-next-line max-lines-per-function
const BookCard = ({ data: b }: { data: AbstractBook }) => {
    const author = b.authors.map(fapi.authors.getShortname).join(", ");
    const publisher = `${b.publishingHouse.name}`;
    const title = `${author} — ${b.name}`;
    const description = `${publisher} (${b.publicationYear})`;

    return (
        <Card
            key={b.id}
            hoverable
            style={{ width: "30%" }}
            headStyle={{ background: "grey" }}
            cover={<BookFilled className={styles.gridItemImgPlaceholder} />}
            className={styles.gridItem}
        >
            {/* FIXME: Поправить разметку */}
            <Card.Meta
                title={
                    <div className={styles.gridItemTitle}>
                        <span className={styles.gridItemPrice}>
                            от {fapi.books.getPseudoPrice(b)} ₽
                        </span>
                        <Link to={`/book/${b.id}`}>{title}</Link>
                    </div>
                }
                description={
                    <div className={styles.gridItemDescription}>
                        <span>{description}</span>
                        <div className={styles.gridItemActions}>
                            <Button
                                type="default"
                                icon={<HeartOutlined />}
                                onClick={() => alert.success("Добавлено в избранное", title)}
                            >
                                В избранное
                            </Button>
                            <Button
                                type="primary"
                                icon={<ShoppingCartOutlined />}
                                onClick={() => alert.success("Добавлено к заказу", title)}
                            >
                                В аренду
                            </Button>
                        </div>
                    </div>
                }
            />
        </Card>
    );
};

export default CatalogContent;
