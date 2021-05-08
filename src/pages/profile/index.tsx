import { Typography, Layout, Avatar, Row, Col, Divider } from "antd";
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { Header, Footer, Wallet } from "features";
import { useViewer } from "entities/viewer";
import { BookCard } from "entities/book";
import { dom } from "shared/lib";
import { SkeletonСard } from "shared/ui";
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

const stats = [
    { key: "registered", label: "В сервисе с", value: "2 мая 2021" },
    { key: "closed", label: "Закрыто", value: "10 сделок" },
    { key: "saved", label: "Сэкономлено", value: "400 ₽" },
    { key: "earned", label: "Заработано", value: "0 ₽" },
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
                        {stats.map((stat) => (
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
    return (
        <Layout className={styles.content}>
            <OwnSection />
            <OpenedSection />
            <ReservationsSection />
            <ClosedSection />
        </Layout>
    );
};

const OwnSection = () => {
    return (
        <section className={styles.contentSection}>
            <Typography.Title level={3}>Мои книги</Typography.Title>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                Добавленные мною в сервис
            </Typography.Text>
            <SkeletonСard height={200} />
        </section>
    );
};

const OpenedSection = () => {
    const viewer = useViewer();
    return (
        <section className={styles.contentSection}>
            <Typography.Title level={3}>Арендованные книги</Typography.Title>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                Книги на руках
            </Typography.Text>
            <Row gutter={[10, 10]} wrap={false} className={styles.contentSectionList}>
                {/* FIXME: Позднее - здесь должны отбражаться все книги, которые "доставлены" */}
                {viewer.openedOrders.map((book) => (
                    <Col key={book.id} span={7}>
                        <BookCard data={book} size="small" />
                    </Col>
                ))}
            </Row>
        </section>
    );
};
const ReservationsSection = () => {
    return (
        <section className={styles.contentSection}>
            <Typography.Title level={3}>Забронированные книги</Typography.Title>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                Добавленные в очередь на аренду
            </Typography.Text>
            <SkeletonСard height={200} />
        </section>
    );
};

const ClosedSection = () => {
    return (
        <section className={styles.contentSection}>
            <Typography.Title level={3}>Закрытые заказы</Typography.Title>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                Книги с прошлых заказов
            </Typography.Text>
            <SkeletonСard height={200} />
        </section>
    );
};

export default ProfilePage;
