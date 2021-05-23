import { Typography, Layout, Row, Col, Empty, Button } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ShoppingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import pluralize from "plural-ru";

import { useViewer } from "entities/viewer";
import { BookCard } from "entities/book";
import type { AbstractBook } from "shared/api";
import * as lib from "../lib";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
export const Content = () => {
    const viewer = useViewer();
    return (
        <Layout className={styles.root}>
            <Section
                id="my"
                title="Мои книги"
                description="Добавленные мною в сервис"
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
                id="opened"
                title="Арендованные книги"
                description="Книги на руках"
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
                id="reserved"
                title="Забронированные книги"
                description="Добавленные в очередь на аренду"
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
                id="closed"
                title="История аренды"
                description="Книги с прошлых заказов"
                books={viewer.closedOrders}
                Icon={CheckCircleOutlined}
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
