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
import pluralize from "plural-ru";

import { viewerModel } from "entities/viewer";
import { BookCard } from "entities/book";
import type { AbstractBook } from "shared/api";
import * as lib from "../lib";
import { TOPIC_CLOSED, TOPIC_MY, TOPIC_OPENED, TOPIC_RESERVED, TOPIC_FAV } from "../config";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
export const Content = () => {
    const viewer = viewerModel.useViewer();
    const favBooks = viewerModel.useFavBooks();

    return (
        <Layout className={styles.root}>
            <Section
                id={TOPIC_MY.id}
                title={TOPIC_MY.fullTitle}
                description={TOPIC_MY.description}
                books={viewer.books}
                Icon={DollarOutlined}
                titleAfter={
                    <Button title="Добавить книгу в сервис" icon={<PlusOutlined />} type="primary">
                        Добавить
                    </Button>
                }
                renderBookDetails={(b) => {
                    const { status, earned } = lib.getOwnBookPseudoStat(b);
                    return (
                        <ul>
                            <li>{status}</li>
                            <li>Заработано {earned} ₽</li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_OPENED.id}
                title={TOPIC_OPENED.fullTitle}
                description={TOPIC_OPENED.description}
                books={viewer.openedOrders}
                Icon={ShoppingOutlined}
                renderBookDetails={(b) => {
                    const { status, statusId } = lib.getRentedBookStat(b);

                    return (
                        <ul>
                            <li>{status}</li>
                            <li>
                                {statusId === 0 && "Будет доставлена через 3 дня"}
                                {statusId === 1 && "Осталось: 4 дня"}
                            </li>
                            {/* <li>
                                <sup>
                                    <Typography.Text disabled>
                                        <i>
                                            Получите обратно на счет за возврат{" "}
                                            <b>{fakeApi.books.getPseudoPrice(b) * 0.2} ₽</b>
                                        </i>
                                    </Typography.Text>
                                </sup>
                            </li> */}
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
                renderBookDetails={(b) => {
                    const queueIdx = Math.floor(b.name.length / 2);
                    return (
                        <ul>
                            <li>
                                В очереди: <b>{queueIdx}</b>
                            </li>
                            <li>
                                Время ожидания: ~{" "}
                                <b>{pluralize(queueIdx * 7, "%d день", "%d дня", "%d дней")}</b>
                            </li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_CLOSED.id}
                title={TOPIC_CLOSED.fullTitle}
                description={TOPIC_CLOSED.description}
                books={viewer.closedOrders}
                Icon={CheckCircleOutlined}
            />
            <Section
                id={TOPIC_FAV.id}
                title={TOPIC_FAV.fullTitle}
                description={TOPIC_FAV.description}
                books={favBooks}
                Icon={HeartOutlined}
            />
        </Layout>
    );
};

type SectionProps = {
    id: string;
    title: ReactNode;
    titleAfter?: ReactNode;
    description: ReactNode;
    renderBookDetails?: (book: AbstractBook) => ReactNode;
    // FIXME: specify later
    Icon: typeof CheckCircleOutlined;
    books: AbstractBook[];
};

const Section = (props: SectionProps) => {
    const { title, description, books, Icon, id, renderBookDetails, titleAfter } = props;

    return (
        <section className={styles.section} id={id}>
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
                {books.map((book) => (
                    <Col key={book.id} span={8}>
                        <BookCard data={book} size="small">
                            {renderBookDetails?.(book)}
                        </BookCard>
                    </Col>
                ))}
            </Row>
            {!books.length && <Empty className={styles.sectionPlaceholder} description="Пусто" />}
        </section>
    );
};
