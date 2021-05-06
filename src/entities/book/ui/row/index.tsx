import { Row, Col } from "antd";
import { BookFilled } from "@ant-design/icons";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import type { AbstractBook } from "entities/types";
import * as fapi from "shared/fixtures";
import styles from "./styles.module.scss";

type Size = "large" | "default" | "small";
type Props = {
    data: AbstractBook;
    className?: string;
    titleAsLink?: boolean;
    size?: Size;
};

const spanIcon: Record<Size, number> = {
    small: 2,
    default: 3,
    large: 4,
};

const styleIcon: Record<Size, CSSProperties> = {
    small: {
        fontSize: 20,
        padding: 10,
    },
    default: {
        fontSize: 60,
        padding: 30,
    },
    large: {
        fontSize: 80,
        padding: 40,
    },
};

const styleDetails: Record<Size, CSSProperties> = {
    small: {},
    default: {},
    large: {
        fontSize: 18,
        lineHeight: "40px",
        marginLeft: 20,
    },
};

// FIXME:
// eslint-disable-next-line max-lines-per-function
const BookRow = (props: Props) => {
    const { data, className, size = "default", titleAsLink = true } = props;

    const title = fapi.books.getShortname(data);
    const price = fapi.books.getPseudoPrice(data);
    const isSmall = size === "small";

    return (
        <Row align="middle" className={cn(styles.bookRow, className)}>
            <Col span={spanIcon[size]}>
                <BookFilled className={styles.bookRowIcon} style={styleIcon[size]} />
            </Col>
            <Col className={styles.bookRowDetails} style={styleDetails[size]}>
                {titleAsLink ? <Link to={`/book/${data.id}`}>{title}</Link> : <span>{title}</span>}

                <span className={styles.bookRowDetailsDescription}>
                    {data.publicationYear}, {data.publishingHouse.name}
                </span>

                {!isSmall && <span className={styles.bookRowDetailsPrice}>{price} ₽</span>}
            </Col>
        </Row>
    );
};

export default BookRow;
