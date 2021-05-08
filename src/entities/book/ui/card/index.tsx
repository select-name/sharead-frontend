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
    children?: import("react").ReactNode;
    className?: string;
    size?: Size;
    withActions?: boolean;
};

const bodyStyle: Record<Size, CSSProperties> = {
    default: { height: 176 },
    small: { height: 176 },
    mini: { display: "none" },
};

const imgStyle: Record<Size, CSSProperties> = {
    default: {
        padding: "100px 0",
        fontSize: 100,
    },
    small: {
        padding: "80px 0",
        fontSize: 100,
    },
    mini: {
        padding: "40px 0",
        fontSize: 70,
    },
};

// FIXME:
// eslint-disable-next-line max-lines-per-function
const BookCard = (props: Props) => {
    const { data: b, className, size = "default", withActions = true, children } = props;
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
            cover={<BookFilled style={imgStyle[size]} />}
            className={cn(styles.root, styles[`bookCard${string.capitalize(size)}`], className)}
            actions={withActions && !isMini ? getActions(title) : undefined}
        >
            {/* FIXME: Поправить разметку */}
            <Card.Meta
                className={styles.meta}
                title={
                    <div className={styles.header}>
                        <span className={styles.price}>от {fapi.books.getPseudoPrice(b)} ₽</span>
                        <Link to={`/book/${b.id}`} title={title} className={styles.title}>
                            {string.textOverflow(title, 50)}
                        </Link>
                    </div>
                }
                description={
                    <>
                        {isDefault && <span>{description}</span>}
                        {children}
                    </>
                }
            />
        </Card>
    );
};

const getActions = (title: string) => [
    <HeartOutlined key="fav" onClick={() => alert.success("Добавлено в избранное", title)} />,
    <ShoppingCartOutlined key="cart" onClick={() => alert.success("Добавлено к заказу", title)} />,
];
export default BookCard;
