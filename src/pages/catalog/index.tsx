import { Typography, Card } from "antd";
import { BookFilled } from "@ant-design/icons";

import { Header } from "features/header";
import * as fapi from "shared/fixtures";
import ImgPlaceholder from "./book-placeholder.jpg";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!

/**
 * @page Каталог книг
 */
const CatalogPage = () => {
    return (
        <>
            <Header />
            <div className={styles.root}>
                <Typography.Title className={styles.title} level={2}>
                    Каталог книг
                </Typography.Title>
                <div className={styles.catalog}>
                    <div className={styles.grid}>
                        {fapi.books.getAll().map((b) => (
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
                </div>
            </div>
        </>
    );
};

export default CatalogPage;
