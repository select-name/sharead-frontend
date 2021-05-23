import { Typography, Layout, Row, Col, Empty, Button } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ShoppingOutlined,
    PlusOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import { Fav } from "features/fav";
import { viewerModel, viewerLib } from "entities/viewer";
import { BookCard } from "entities/book";
import type { Book, AbstractBook } from "shared/api";
import * as lib from "../lib";
import { TOPIC_CLOSED, TOPIC_MY, TOPIC_OPENED, TOPIC_RESERVED, TOPIC_FAV } from "../config";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
export const Content = () => {
    const viewer = viewerModel.useViewer();
    const viewerNrml = viewerModel.useViewerNormalized();
    const favBooks = viewerModel.useFavBooks();
    const currentAnchor = useLocation().hash.slice(1);

    return (
        <Layout className={styles.root}>
            <Section
                id={TOPIC_MY.id}
                title={TOPIC_MY.fullTitle}
                description={TOPIC_MY.description}
                books={viewerNrml.ownBooks}
                Icon={DollarOutlined}
                active={TOPIC_MY.id === currentAnchor}
                titleAfter={
                    <Button title="Добавить книгу в сервис" icon={<PlusOutlined />} type="primary">
                        Добавить
                    </Button>
                }
                renderBookDetails={(b) => {
                    const bookInfo = viewerLib.getMyBookInfo(b);
                    return (
                        <ul>
                            <li>{lib.STATUSES[bookInfo.status]}</li>
                            <li>Заработано {bookInfo.earned} ₽</li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_OPENED.id}
                title={TOPIC_OPENED.fullTitle}
                description={TOPIC_OPENED.description}
                books={viewerNrml.openedBooks}
                Icon={ShoppingOutlined}
                active={TOPIC_OPENED.id === currentAnchor}
                renderBookDetails={(_, idx) => {
                    const order = viewerNrml.opened[idx];

                    return (
                        <ul>
                            <li>{lib.STATUSES[order.status]}</li>
                            <li>{viewerLib.getOrderInfo(order)}</li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_RESERVED.id}
                title={TOPIC_RESERVED.fullTitle}
                description={TOPIC_RESERVED.description}
                books={viewer.reservations}
                Icon={ClockCircleOutlined}
                active={TOPIC_RESERVED.id === currentAnchor}
                renderBookDetails={(b) => {
                    const queueIdx = Math.floor(b.name.length / 2);
                    return (
                        <ul>
                            <li>
                                В очереди: <b>{queueIdx}</b>
                            </li>
                            <li>
                                Время ожидания: ~ <b>{viewerLib.getDaysLabel(queueIdx * 7)}</b>
                            </li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_CLOSED.id}
                title={TOPIC_CLOSED.fullTitle}
                description={TOPIC_CLOSED.description}
                books={viewerNrml.closedBooks}
                Icon={CheckCircleOutlined}
                active={TOPIC_CLOSED.id === currentAnchor}
            />
            <Section
                id={TOPIC_FAV.id}
                title={TOPIC_FAV.fullTitle}
                description={TOPIC_FAV.description}
                books={favBooks}
                Icon={HeartOutlined}
                active={TOPIC_FAV.id === currentAnchor}
                renderBookActions={(b) => [<Fav.Actions.AddBookMini key="fav" bookId={b.id} />]}
            />
        </Layout>
    );
};

type SectionProps<T> = {
    id: string;
    title: ReactNode;
    titleAfter?: ReactNode;
    description: ReactNode;
    renderBookDetails?: (book: T, idx: number) => ReactNode;
    renderBookActions?: (book: T, idx: number) => ReactNode[];
    // FIXME: specify later
    Icon: typeof CheckCircleOutlined;
    books: T[];
    active?: boolean;
};

function Section<T extends Book | AbstractBook>(props: SectionProps<T>) {
    const { title, description, books, Icon, id, titleAfter, active } = props;

    return (
        <section className={cn(styles.section, { [styles.sectionActive]: active })} id={id}>
            <Row justify="space-between">
                <Typography.Title level={3} className={styles.sectionTitle}>
                    <a href={`#${id}`}>#</a>
                    {title} <Icon style={{ color: "gray", fontSize: 20 }} />
                </Typography.Title>
                {titleAfter}
            </Row>
            <Typography.Text className={styles.sectionDescription} type="secondary">
                {description}
            </Typography.Text>
            <Row gutter={[10, 10]} wrap={false} className={styles.sectionList}>
                {/* FIXME: Позднее - здесь должны отбражаться все книги, которые "доставлены" */}
                {books.map((book, idx) => (
                    <Col key={book.id} span={8}>
                        <BookCard
                            // @ts-ignore
                            data={book.abstractBook || book}
                            size="small"
                            withPrice={false}
                            actions={props.renderBookActions?.(book, idx)}
                        >
                            {props.renderBookDetails?.(book, idx)}
                        </BookCard>
                    </Col>
                ))}
            </Row>
            {!books.length && <Empty className={styles.sectionPlaceholder} description="Пусто" />}
        </section>
    );
}
