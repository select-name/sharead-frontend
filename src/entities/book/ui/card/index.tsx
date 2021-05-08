import { Card } from "antd";
import { BookFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";
import cn from "classnames";

import type { AbstractBook } from "shared/api";
import { fakeApi } from "shared/api";
import { string } from "shared/lib";
import styles from "./styles.module.scss";

type Size = "default" | "small" | "mini";

type Props = {
    data: AbstractBook;
    children?: ReactNode;
    className?: string;
    size?: Size;
    actions?: ReactNode;
    withDescription?: boolean;
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
    const { data: b, className, size = "default", children, actions } = props;
    const author = b.authors.map(fakeApi.authors.getShortname).join(", ");
    const publisher = `${b.publishingHouse.name}`;
    const title = `${author} — ${b.name}`;
    const description = `${publisher} (${b.publicationYear})`;

    const isDefault = size === "default";
    // const isSmall = size === "small";
    const isMini = size === "mini";

    const withDescription = props.withDescription || isDefault;

    return (
        <Card
            key={b.id}
            hoverable
            // headStyle={{ background: "grey" }}
            bodyStyle={bodyStyle[size]}
            cover={<BookFilled style={imgStyle[size]} />}
            className={cn(styles.root, styles[`bookCard${string.capitalize(size)}`], className)}
            actions={isMini || !actions ? undefined : [<>{actions}</>]}
        >
            {/* FIXME: Поправить разметку */}
            <Card.Meta
                className={styles.meta}
                title={
                    <div className={styles.header}>
                        <span className={styles.price}>от {fakeApi.books.getPseudoPrice(b)} ₽</span>
                        <Link to={`/book/${b.id}`} title={title} className={styles.title}>
                            {string.textOverflow(title, 50)}
                        </Link>
                    </div>
                }
                description={
                    <>
                        {withDescription && <span>{description}</span>}
                        {children}
                    </>
                }
            />
        </Card>
    );
};

// const getActions = (title: string) => [
//     <HeartOutlined key="fav" onClick={() => alert.success("Добавлено в избранное", title)} />,
// ];

export default BookCard;
