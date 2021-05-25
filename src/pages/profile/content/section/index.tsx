import { Typography, Row, Col, Empty, Badge } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import cn from "classnames";

import { BookCard } from "entities/book";
import type { Book, AbstractBook } from "shared/api";
import styles from "./styles.module.scss";

type Props<T> = {
    id: string;
    title: ReactNode;
    titleAfter?: ReactNode;
    description: ReactNode;
    renderBookDetails?: (book: T, idx: number) => ReactNode;
    renderBookActions?: (book: T, idx: number) => ReactNode[];
    getRibbonProps?: (
        book: T,
        idx: number,
    ) => {
        text: ReactNode;
        color: import("react").CSSProperties["color"];
    };
    // FIXME: specify later
    Icon: typeof CheckCircleOutlined;
    books: T[];
    active?: boolean;
};

export function Section<T extends Book | AbstractBook>(props: Props<T>) {
    const { title, description, books, Icon, id, titleAfter, active } = props;

    return (
        <section className={cn(styles.root, { [styles.active]: active })} id={id}>
            <Row justify="space-between">
                <Typography.Title level={3} className={styles.title}>
                    <a href={`#${id}`}>#</a>
                    {title} <Icon style={{ color: "gray", fontSize: 20 }} />
                </Typography.Title>
                {titleAfter}
            </Row>
            <Typography.Text className={styles.description} type="secondary">
                {description}
            </Typography.Text>
            <Row gutter={[10, 10]} wrap={false} className={styles.list}>
                {/* FIXME: Позднее - здесь должны отбражаться все книги, которые "доставлены" */}
                {books.map((book, idx) => (
                    <Col key={book.id} span={8}>
                        <Badge.Ribbon
                            {...props.getRibbonProps?.(book, idx)}
                            style={{
                                right: "-5px",
                                opacity: Number(props.getRibbonProps !== undefined),
                            }}
                        >
                            <BookCard
                                // @ts-ignore
                                data={book.abstractBook || book}
                                size="small"
                                withPrice={false}
                                actions={props.renderBookActions?.(book, idx)}
                            >
                                {props.renderBookDetails?.(book, idx)}
                            </BookCard>
                        </Badge.Ribbon>
                    </Col>
                ))}
            </Row>
            {!books.length && <Empty className={styles.placeholder} description="Пусто" />}
        </section>
    );
}
