import { Steps, Typography, Layout, Row, Col, Divider, Button } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import pluralize from "plural-ru";

import { Header, Footer } from "features";
import { BookCard, BookRowCard } from "entities/book";
import { TariffRadio } from "entities/tariff";
import { dom, alert } from "shared/lib";
import { useOrder } from "../hooks";
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
    const order = useOrder();

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
                    {order.books.map((book) => (
                        <Col key={book.id} span={24}>
                            <BookRowCard
                                data={book}
                                size="large"
                                withActions={false}
                                extra={<TariffRadio onChange={alert.success} />}
                            />
                        </Col>
                    ))}
                </Row>
            </section>
            <section className={styles.contentSection}>
                <RecommendationsSection />
            </section>
        </Layout>
    );
};

const RecommendationsSection = () => {
    const order = useOrder();

    return (
        <>
            <Typography.Title level={3} type="secondary">
                Присмотритесь также
            </Typography.Title>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                Подборка рекомендованых книг, на основе вашего заказа
            </Typography.Text>
            <Row className={styles.recommendsFeed} wrap={false} gutter={[20, 0]}>
                {order.recommended.map((b) => (
                    <Col key={b.id} span={8}>
                        <BookCard data={b} size="small" className={styles.recommendsFeedItem} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

// FIXME: DRY with order/checkout
// eslint-disable-next-line max-lines-per-function
const Sidebar = () => {
    const order = useOrder();

    return (
        <Layout.Sider className={styles.sidebarContainer} width={400}>
            <div className={styles.sidebar}>
                <section className={styles.sidebarSection}>
                    <Row justify="space-between" align="middle">
                        <Typography.Title level={4}>Итого</Typography.Title>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            {order.price} ₽
                        </Typography.Title>
                    </Row>
                    <Row align="middle" className={styles.sidebarSectionDetail}>
                        <BookOutlined />
                        &nbsp;
                        <Typography.Text type="secondary">
                            {pluralize(order.books.length, "%d книга", "%d книги", "%d книг")}
                        </Typography.Text>
                    </Row>
                    <Row align="middle" className={styles.sidebarSectionDetail}>
                        <ClockCircleOutlined />
                        &nbsp;
                        <Typography.Text type="secondary">На 2-3 недели</Typography.Text>
                    </Row>
                </section>
                <Divider style={{ margin: 0 }} />
                <section className={styles.sidebarSection}>
                    <Link to="/order/checkout">
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
