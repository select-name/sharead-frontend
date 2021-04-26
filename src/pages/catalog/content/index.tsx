import { Card, Empty, Layout } from "antd";
import { BookFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { headerParams } from "features/header";
import * as fapi from "shared/fixtures";
// FIXME: resolve better params usage
import * as catalogParams from "../params";
import styles from "./styles.module.scss";

const useFilters = () => {
    const { authors } = catalogParams.useFilterByAuthor();
    const { publishers } = catalogParams.useFilterByPublisher();

    return { authors, publishers };
};

const getRandomPrice = () => {
    const factor = Math.floor(Math.random() * 3) + 2;

    return factor * 50;
};

const CatalogContent = () => {
    const params = headerParams.useSearchParam();
    const filters = useFilters();
    const booksQuery = fapi.books.getList({ search: params.search, ...filters });

    // FIXME: add later ListView
    return (
        <Layout.Content>
            <div className={styles.grid}>
                {booksQuery.map((b) => {
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
                            <Card.Meta
                                title={
                                    <>
                                        <span className={styles.gridItemPrice}>
                                            от {getRandomPrice()} ₽
                                        </span>
                                        <Link to={`/book/${b.id}`}>{title}</Link>
                                    </>
                                }
                                description={description}
                            />
                        </Card>
                    );
                })}
            </div>
            {booksQuery.length === 0 && (
                <Empty
                    className={styles.catalogPlaceholder}
                    description="Не удалось найти книги по вашему запросу"
                />
            )}
        </Layout.Content>
    );
};

export default CatalogContent;
