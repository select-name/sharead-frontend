import { Steps, Typography, Layout, Row, Col, Divider, Button } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Header, Footer } from "features";
import { dom } from "shared/lib";
import { SkeletonСard } from "shared/ui";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Страница текущей корзины заказа
 */
const CardPage = () => {
    // FIXME: Сделать позже через промиз
    dom.useTitle("Аренда книг | Sharead");

    return (
        <Layout className={styles.root}>
            <Header />
            <Layout.Content>
                {/* FIXME: DRY */}
                <Steps current={0} className={styles.rootSteps}>
                    <Steps.Step title="Корзина" description="Проверьте свой выбор" />
                    <Steps.Step title="Оформление" description="Выбор оплаты, доставки" />
                    <Steps.Step title="Доставка" description="Получение заказа" />
                </Steps>
                <Layout>
                    <Content />
                    <Sidebar />
                </Layout>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

const Content = () => {
    return (
        <Layout className={styles.content}>
            <Typography.Title level={2}>Корзина</Typography.Title>
            <section className={styles.contentSection}>
                <Typography.Title level={3} type="secondary">
                    Содержимое заказа
                </Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Проверьте выбранные книги перед оформлением
                </Typography.Text>
                <Row gutter={[0, 20]}>
                    {Array(3)
                        .fill(null)
                        .map((_, index) => (
                            <Col key={index} span={24}>
                                <SkeletonСard height={200} />
                            </Col>
                        ))}
                </Row>
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3} type="secondary">
                    Присмотритесь также
                </Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Подборка рекомендованых книг, на основе вашего заказа
                </Typography.Text>
                <Row justify="space-between">
                    {Array(4)
                        .fill(null)
                        .map((_, index) => (
                            <Col key={index} span={5}>
                                <SkeletonСard height={300} />
                            </Col>
                        ))}
                </Row>
            </section>
        </Layout>
    );
};

// eslint-disable-next-line max-lines-per-function
const Sidebar = () => {
    return (
        <Layout.Sider className={styles.sidebarContainer} width={400}>
            <div className={styles.sidebar}>
                <section className={styles.sidebarSection}>
                    <Row justify="space-between" align="middle">
                        <Typography.Title level={4}>Итого</Typography.Title>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            500 ₽
                        </Typography.Title>
                    </Row>
                    <Row align="middle" className={styles.sidebarSectionDetail}>
                        <BookOutlined />
                        &nbsp;
                        <Typography.Text type="secondary">4 книги</Typography.Text>
                    </Row>
                    <Row align="middle" className={styles.sidebarSectionDetail}>
                        <ClockCircleOutlined />
                        &nbsp;
                        <Typography.Text type="secondary">На 2-3 недели</Typography.Text>
                    </Row>
                </section>
                <Divider style={{ margin: 0 }} />
                <section className={styles.sidebarSection}>
                    <Link to="/checkout">
                        <Button block type="primary" style={{ height: 50 }}>
                            Перейти к оформлению
                        </Button>
                    </Link>
                </section>
            </div>
        </Layout.Sider>
    );
};

export default CardPage;
