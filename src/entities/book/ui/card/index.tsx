import { Button, Card } from "antd";
import { BookFilled, ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import cn from "classnames";

import type { AbstractBook } from "entities/types";
import * as fapi from "shared/fixtures";
// FIXME:
// eslint-disable-next-line no-restricted-imports
import alert from "shared/lib/alert";
import styles from "./styles.module.scss";

type Props = {
    data: AbstractBook;
    className?: string;
};

// FIXME:
// eslint-disable-next-line max-lines-per-function
const BookCard = (props: Props) => {
    const { data: b, className } = props;
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
            cover={<BookFilled className={styles.bookCardImgPlaceholder} />}
            className={cn(styles.bookCard, className)}
        >
            {/* FIXME: Поправить разметку */}
            <Card.Meta
                title={
                    <div className={styles.bookCardTitle}>
                        <span className={styles.bookCardPrice}>
                            от {fapi.books.getPseudoPrice(b)} ₽
                        </span>
                        <Link to={`/book/${b.id}`}>{title}</Link>
                    </div>
                }
                description={
                    <div className={styles.bookCardDescription}>
                        <span>{description}</span>
                        <div className={styles.bookCardActions}>
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

export default BookCard;
