import { Typography, Layout, Avatar, Row, Col, Divider } from "antd";
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { Header, Footer } from "features";
import { useViewer } from "entities/viewer";
import { dom } from "shared/lib";
import { SkeletonСard } from "shared/ui";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Страница книги
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
                    <Typography.Text>{/* FIXME */}В сервисе с 2 мая 2021</Typography.Text>
                    <Typography.Text>10 закрытых сделок</Typography.Text>
                </section>
                <Divider />
                <section>
                    <Typography.Title level={4}>С нашим сервисом</Typography.Title>
                    <Row justify="space-between" gutter={[0, 20]}>
                        <Col span={11}>
                            <SkeletonСard />
                        </Col>
                        <Col span={11}>
                            <SkeletonСard />
                        </Col>
                        <Col span={11}>
                            <SkeletonСard />
                        </Col>
                        <Col span={11}>
                            <SkeletonСard />
                        </Col>
                    </Row>
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
                <Typography.Text className={styles.contentSectionDescription}>
                    Добавленные мною в сервис
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3}>Арендованные книги</Typography.Title>
                <Typography.Text className={styles.contentSectionDescription}>
                    Книги на руках
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3}>Забронированные книги</Typography.Title>
                <Typography.Text className={styles.contentSectionDescription}>
                    Добавленные в очередь на аренду
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3}>Закрытые заказы</Typography.Title>
                <Typography.Text className={styles.contentSectionDescription}>
                    Книги с прошлых заказов
                </Typography.Text>
                <SkeletonСard height={200} />
            </section>
        </Layout>
    );
};

export default ProfilePage;
