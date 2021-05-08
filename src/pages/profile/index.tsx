import { Typography, Layout, Avatar, Row, Col, Divider, Empty, Button } from "antd";
import {
    UserOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ShoppingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

import { Header, Footer, Wallet } from "features";
import type { AbstractBook, User } from "entities/types";
import { useViewer } from "entities/viewer";
import { BookCard } from "entities/book";
import * as fapi from "shared/fixtures";
import { dom } from "shared/lib";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Страница профиля
 */
const ProfilePage = () => {
    // FIXME: Сделать позже через промиз
    dom.useTitle("Личный кабинет | Sharead");

    return (
        <Layout className={styles.root}>
            <Header />
            <Layout.Content>
                <Layout>
                    <Aside />
                    <Content />
                </Layout>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

const getStats = (viewer: User) => [
    { key: "registered", label: "В сервисе с", value: "2 мая 2021" },
    { key: "closed", label: "Закрыто", value: "10 сделок" },
    { key: "saved", label: "Сэкономлено", value: "400 ₽" },
    {
        key: "earned",
        label: "Заработано",
        value: `${viewer.books
            .map(getOwnBookPseudoStat)
            .map((it) => it.earned)
            .reduce((a, b) => a + b)} ₽`,
    },
];

// eslint-disable-next-line max-lines-per-function
const Aside = () => {
    const viewer = useViewer();

    /* FIXME: move to entitites */
    return (
        <Layout.Sider className={styles.asideContainer} width={400}>
            <div className={styles.aside}>
                <section className={styles.asideMain}>
                    <Avatar size={128} icon={<UserOutlined />} />
                    <Typography.Title level={3}>
                        {viewer.firstName} {viewer.lastName}
                    </Typography.Title>
                    <Typography.Text>
                        {viewer.email}&nbsp;
                        <EmailVerified emailVerified={viewer.emailVerified} />
                    </Typography.Text>
                    {/* <Typography.Text>FIXME: В сервисе с 2 мая 2021</Typography.Text> */}
                    {/* <Typography.Text>10 закрытых сделок</Typography.Text> */}
                </section>
                <Divider />
                <section>
                    <Wallet.AddFunds.Popover
                        placement="right"
                        buttonStyle={{ fontSize: 30, height: 60, width: "100%" }}
                    />
                </section>
                <Divider />
                <section>
                    {/* <Typography.Title level={4}>С нашим сервисом</Typography.Title> */}
                    <Row justify="space-between" gutter={[0, 20]} className={styles.stats}>
                        {getStats(viewer).map((stat) => (
                            <Col key={stat.key} span={11} className={styles.statsItem}>
                                <span>
                                    {stat.label}
                                    <br />
                                    <b>{stat.value}</b>
                                </span>
                            </Col>
                        ))}
                    </Row>
                </section>
            </div>
        </Layout.Sider>
    );
};

const EmailVerified = ({ emailVerified }: { emailVerified: boolean }) => {
    if (emailVerified) {
        return <CheckCircleOutlined title="Почта подтверждена" style={{ color: "green" }} />;
    }

    return <ClockCircleOutlined title="Ожидает подтверждения" style={{ color: "red" }} />;
};

const Content = () => {
    const viewer = useViewer();
    return (
        <Layout className={styles.content}>
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
                    const bookStat = getOwnBookPseudoStat(b);
                    return (
                        <span>
                            {bookStat.status}, заработано {bookStat.earned} ₽
                        </span>
                    );
                }}
            />
            <Section
                id="opened"
                title="Арендованные книги"
                description="Книги на руках"
                books={viewer.openedOrders}
                Icon={ShoppingOutlined}
            />
            <Section
                id="reserved"
                title="Забронированные книги"
                description="Добавленные в очередь на аренду"
                books={viewer.reservations}
                Icon={ClockCircleOutlined}
            />
            <Section
                id="closed"
                title="Закрытые заказы"
                description="Книги с прошлых заказов"
                books={viewer.closedOrders}
                Icon={CheckCircleOutlined}
            />
        </Layout>
    );
};

const statuses: Record<number, ReactNode> = {
    0: <Typography.Text type="success">Арендуется</Typography.Text>,
    1: <Typography.Text type="warning">Ожидает передачи</Typography.Text>,
    2: <Typography.Text style={{ color: "#108ee9" }}>Свободна</Typography.Text>,
};

// FIXME: temp!
const getOwnBookPseudoStat = (book: AbstractBook) => ({
    earned: fapi.books.getPseudoPrice(book) * (book.name.length % 4),
    status: statuses[book.name.length % 3],
});

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
        <section className={styles.contentSection} id={id}>
            <Row justify="space-between">
                <Typography.Title level={3} className={styles.contentSectionTitle}>
                    <a href={`#${id}`}>#</a>
                    {title} <Icon style={{ color: "gray", fontSize: 20 }} />
                </Typography.Title>
                {titleAfter}
            </Row>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                {description}
            </Typography.Text>
            <Row gutter={[10, 10]} wrap={false} className={styles.contentSectionList}>
                {/* FIXME: Позднее - здесь должны отбражаться все книги, которые "доставлены" */}
                {books.map((book) => (
                    <Col key={book.id} span={8}>
                        <BookCard data={book} size="small" withActions={false}>
                            {renderBookDetails?.(book)}
                        </BookCard>
                    </Col>
                ))}
            </Row>
            {!books.length && (
                <Empty className={styles.contentSectionPlaceholder} description="Пусто" />
            )}
        </section>
    );
};

export default ProfilePage;
