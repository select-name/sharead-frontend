import { Steps, Typography, Layout, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

import { Header, Footer, Order } from "features";
import { BookCard, BookRowCard } from "entities/book";
import { orderModel } from "entities/order";
import { TariffRadio } from "entities/tariff";
import { dom, alert } from "shared/lib";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Страница текущей корзины заказа
 */
const CartPage = () => {
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
    const order = orderModel.useOrder();

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
                                actions={
                                    <>
                                        <Order.Actions.DeleteBook bookId={book.id} />
                                        <TariffRadio onChange={alert.success} />
                                    </>
                                }
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
    const recommended = orderModel.useRecommended();

    return (
        <>
            <Typography.Title level={3} type="secondary">
                Присмотритесь также
            </Typography.Title>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                Подборка рекомендованых книг, на основе вашего заказа
            </Typography.Text>
            <Row className={styles.recommendsFeed} wrap={false} gutter={[20, 0]}>
                {recommended.books.map((b) => (
                    <Col key={b.id} span={8}>
                        <BookCard
                            data={b}
                            size="small"
                            className={styles.recommendsFeedItem}
                            actions={<Order.Actions.AddBookMini bookId={b.id} />}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};

const Sidebar = () => {
    return (
        <Layout.Sider className={styles.sidebarContainer} width={400}>
            <Order.TotalInfo.Card>
                <Link to="/order/checkout">
                    <Button block type="primary" style={{ height: 50 }}>
                        Перейти к оформлению
                    </Button>
                </Link>
            </Order.TotalInfo.Card>
        </Layout.Sider>
    );
};

export default CartPage;
