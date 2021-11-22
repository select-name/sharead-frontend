import { Col, Row } from "antd";
import { BookCard } from "entities/book";
import { fakeApi } from "shared/api";
import styles from "./styles.module.scss";

const Books = () => {
    const booksQuery = fakeApi.library.books.getPopular();

    return (
        <Row className={styles.books} justify="space-between">
            {booksQuery.map((book) => (
                <Col key={book.id} className={styles.booksItem} span={6}>
                    <BookCard data={book} size="small" className={styles.booksItemCard} />
                </Col>
            ))}
        </Row>
    );
};

export { Books };
