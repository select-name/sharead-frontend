import { Typography, Card, Empty, Layout, Divider, Checkbox, Slider } from "antd";
import { BookFilled } from "@ant-design/icons";

// FIXME: resolve better params usage
import { Header, headerParams } from "features/header";
import * as fapi from "shared/fixtures";

import Sidebar from "./sidebar";
import * as catalogParams from "./params";
// FIXME: Не умеет обрабатывать jpg!
// import ImgPlaceholder from "./book-placeholder.jpg";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

const useFilters = () => {
    const { authors } = catalogParams.useFilterByAuthor();
    const { publishers } = catalogParams.useFilterByPublisher();

    return { authors, publishers };
};

/**
 * @page Каталог книг
 */
// eslint-disable-next-line max-lines-per-function
const CatalogPage = () => {
    const params = headerParams.useSearchParam();
    const filters = useFilters();

    const booksQuery = fapi.books.getList({ search: params.search, ...filters });

    return (
        <Layout>
            <Header />
            <div className={styles.root}>
                <Typography.Title className={styles.title} level={2}>
                    Каталог книг
                </Typography.Title>
                <Layout className={styles.catalog}>
                    <Layout.Content>
                        <div className={styles.grid}>
                            {booksQuery.map((b) => (
                                <Card
                                    key={b.id}
                                    hoverable
                                    style={{ width: "30%" }}
                                    headStyle={{ background: "grey" }}
                                    cover={<BookFilled className={styles.gridItemImgPlaceholder} />}
                                    className={styles.gridItem}
                                >
                                    <Card.Meta
                                        title={b.name}
                                        description={b.authors
                                            .map(fapi.authors.getShortname)
                                            .join(", ")}
                                    />
                                </Card>
                            ))}
                        </div>
                        {booksQuery.length === 0 && (
                            <Empty
                                className={styles.catalogPlaceholder}
                                description="Не удалось найти книги по вашему запросу"
                            />
                        )}
                    </Layout.Content>
                    <Sidebar />
                </Layout>
            </div>
        </Layout>
    );
};

export default CatalogPage;
