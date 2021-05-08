import { Card } from "antd";
import { BookFilled, ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import cn from "classnames";

import type { CSSProperties } from "react";
import type { AbstractBook } from "entities/types";
import * as fapi from "shared/fixtures";
import { alert, string } from "shared/lib";
import styles from "./styles.module.scss";

type Size = "default" | "small" | "mini";

type Props = {
    data: AbstractBook;
    className?: string;
    size?: Size;
    withActions?: boolean;
};

const bodyStyle: Record<Size, CSSProperties> = {
    default: { height: 168 },
    small: { height: 168 },
    mini: { display: "none" },
};

// FIXME:
// eslint-disable-next-line max-lines-per-function
const BookCard = (props: Props) => {
    const { data: b, className, size = "default", withActions = true } = props;
    const author = b.authors.map(fapi.authors.getShortname).join(", ");
    const publisher = `${b.publishingHouse.name}`;
    const title = `${author} — ${b.name}`;
    const description = `${publisher} (${b.publicationYear})`;

    const isDefault = size === "default";
    // const isSmall = size === "small";
    const isMini = size === "mini";

    return (
        <Card
            key={b.id}
            hoverable
            // headStyle={{ background: "grey" }}
            bodyStyle={bodyStyle[size]}
            cover={<BookFilled className={styles.bookCardImgPlaceholder} />}
            className={cn(styles.bookCard, styles[`bookCard${string.capitalize(size)}`], className)}
            actions={withActions && !isMini ? getActions(title) : undefined}
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
                description={isDefault && <span>{description}</span>}
            />
        </Card>
    );
};

const getActions = (title: string) => [
    <HeartOutlined key="fav" onClick={() => alert.success("Добавлено в избранное", title)} />,
    <ShoppingCartOutlined key="cart" onClick={() => alert.success("Добавлено к заказу", title)} />,
];
export default BookCard;
