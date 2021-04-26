import { Typography, Card, Empty } from "antd";
import { BookFilled } from "@ant-design/icons";

// FIXME: resolve better params usage
import { Header, headerParams } from "features/header";
import * as fapi from "shared/fixtures";
// FIXME: Не умеет обрабатывать jpg!
// import ImgPlaceholder from "./book-placeholder.jpg";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!

/**
 * @page Каталог книг
 */
const CatalogPage = () => {
    const params = headerParams.useSearchParam();

    const query = fapi.books.getList({ search: params.search });

    return (
        <>
            <Header />
            <div className={styles.root}>
                <Typography.Title className={styles.title} level={2}>
                    Каталог книг
                </Typography.Title>
                <div className={styles.catalog}>
                    <div className={styles.grid}>
                        {query.map((b) => (
                            <Card
                                key={b.id}
                                hoverable
                                style={{ width: 400 }}
                                cover={<BookFilled style={{ fontSize: 100, paddingTop: 20 }} />}
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
                    {query.length === 0 && (
                        <Empty
                            className={styles.placeholder}
                            description="Не удалось найти книги по вашему запросу"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default CatalogPage;
