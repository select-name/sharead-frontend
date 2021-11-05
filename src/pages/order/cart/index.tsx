import { Typography, Layout, Row, Col, Button, Empty } from "antd";
import { Link } from "react-router-dom";

import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { Cart } from "features/cart";
import { Fav } from "features/fav";
import { BookCard, BookRowCard } from "entities/book";
import { orderModel, orderLib } from "entities/order";
import { TariffRadio } from "entities/tariff";
import { dom } from "shared/lib";
import styles from "./styles.module.scss";

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
                <Cart.Steps.View current={0} className={styles.rootSteps} />
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
    const order = orderModel.cart.useOrder();
    const durations = orderModel.cart.useOrderDurations();

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
                                        <Cart.Actions.DeleteBook bookId={book.id} />
                                        <TariffRadio
                                            onChange={(value) =>
                                                orderModel.cart.events.setBookDuration({
                                                    bookId: book.id,
                                                    duration: value,
                                                })
                                            }
                                            value={durations[book.id] || 14}
                                        />
                                    </>
                                }
                            />
                        </Col>
                    ))}
                </Row>
                {!order.books.length && (
                    <Empty className={styles.placeholder} description="Заказ пустой" />
                )}
            </section>
            <section className={styles.contentSection}>
                <RecommendationsSection />
            </section>
        </Layout>
    );
};

const RecommendationsSection = () => {
    const recommended = orderModel.cart.useRecommended();

    if (!recommended.books) return null;

    return (
        <>
            <Typography.Title level={3} type="secondary">
                Присмотритесь также
            </Typography.Title>
            <Typography.Text className={styles.contentSectionDescription} type="secondary">
                Подборка рекомендованых книг, на основе вашего заказа
            </Typography.Text>
            <Row className={styles.recommendsFeed} wrap={false} gutter={[20, 0]}>
                {recommended.books
                    .filter((b) => orderLib.getRentInfo(b.id).status === "RENTABLE")
                    .map((b) => (
                        <Col key={b.id} span={8}>
                            <BookCard
                                data={b}
                                size="small"
                                className={styles.recommendsFeedItem}
                                // TODO: Добавить проверку на rent и вернуть?
                                actions={[
                                    <Fav.Actions.AddBookMini key="fav" bookId={b.id} />,
                                    <Cart.Actions.AddBookMini key="order" bookId={b.id} />,
                                ]}
                                withDescription
                            />
                        </Col>
                    ))}
            </Row>
        </>
    );
};

const Sidebar = () => {
    const { isEmptyCart } = orderModel.cart.useOrderValidation();

    return (
        <Layout.Sider className={styles.sidebarContainer} width={400}>
            <Cart.TotalInfo.Card>
                <Link to="/order/checkout">
                    <Button block type="primary" style={{ height: 50 }} disabled={isEmptyCart}>
                        Перейти к оформлению
                    </Button>
                </Link>
            </Cart.TotalInfo.Card>
        </Layout.Sider>
    );
};

export default CartPage;
