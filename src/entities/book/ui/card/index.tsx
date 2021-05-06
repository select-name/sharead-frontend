import { Button, Card } from "antd";
import { BookFilled, ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import cn from "classnames";

import type { AbstractBook } from "entities/types";
import * as fapi from "shared/fixtures";
import { alert, string } from "shared/lib";
import styles from "./styles.module.scss";

type Props = {
    data: AbstractBook;
    className?: string;
    size?: "default" | "small" | "mini";
};

// FIXME:
// eslint-disable-next-line max-lines-per-function
const BookCard = (props: Props) => {
    const { data: b, className, size = "default" } = props;
    const author = b.authors.map(fapi.authors.getShortname).join(", ");
    const publisher = `${b.publishingHouse.name}`;
    const title = `${author} — ${b.name}`;
    const description = `${publisher} (${b.publicationYear})`;

    const isSmall = size === "small" || size === "mini";
    const isMini = size === "mini";
    // const width = isSmall ? "26%" : "30%";

    const bodyStyle = isMini ? { display: "none" } : { height: 216 };

    return (
        <Card
            key={b.id}
            hoverable
            // style={{ width, minWidth: width }}
            // style={{ width: "100%" }}
            // headStyle={{ background: "grey" }}
            bodyStyle={bodyStyle}
            cover={<BookFilled className={styles.bookCardImgPlaceholder} />}
            className={cn(styles.bookCard, styles[`bookCard${string.capitalize(size)}`], className)}
        >
            {/* FIXME: Поправить разметку */}
            <Card.Meta
                className={styles.bookCardMeta}
                title={
                    <div className={styles.bookCardTitle}>
                        <span className={styles.bookCardPrice}>
                            от {fapi.books.getPseudoPrice(b)} ₽
                        </span>
                        <Link to={`/book/${b.id}`}>{title}</Link>
                    </div>
                }
                description={!isSmall && <Description title={title} description={description} />}
            />
        </Card>
    );
};

const Description = ({ title, description }: { title: string; description: string }) => (
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
);

export default BookCard;
