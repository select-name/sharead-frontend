import { Typography, Layout, Avatar, Row, Col, Divider } from "antd";
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { Header, Footer, Wallet } from "features";
import { useViewer } from "entities/viewer";
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
                        {viewer.emailVerified ? (
                            <CheckCircleOutlined
                                title="Почта подтверждена"
                                style={{ color: "green" }}
                            />
                        ) : (
                            <ClockCircleOutlined
                                title="Ожидает подтверждения"
                                style={{ color: "red" }}
                            />
                        )}
                    </Typography.Text>
                    {/* <Typography.Text>FIXME: В сервисе с 2 мая 2021</Typography.Text> */}
                    {/* <Typography.Text>10 закрытых сделок</Typography.Text> */}
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
                <Divider />
                <section>
                    <Wallet.AddFunds.Popover
                        placement="right"
                        buttonStyle={{ fontSize: 30, height: 60, width: "100%" }}
                    />
                </section>
            </div>
        </Layout.Sider>
    );
};
const Content = () => {
    return (
        <Layout className={styles.content}>
            <section className={styles.contentSection}>
                <Typography.Title level={3}>Мои книги</Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Добавленные мною в сервис
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3}>Арендованные книги</Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Книги на руках
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3}>Забронированные книги</Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Добавленные в очередь на аренду
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3}>Закрытые заказы</Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Книги с прошлых заказов
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
        </Layout>
    );
};

export default ProfilePage;
