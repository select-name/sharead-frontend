import { Steps, Typography, Layout, Row, Divider, Button, Result, Input, Col } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import cn from "classnames";
import { Link, useHistory } from "react-router-dom";
import { YMaps, Map } from "react-yandex-maps";
import pluralize from "plural-ru";

import { Header, Footer, Wallet } from "features";
import { BookCard } from "entities/book";
import { dom } from "shared/lib";
import { useOrder } from "../hooks";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Страница оформления заказа
 */
const CheckoutPage = () => {
    // FIXME: Сделать позже через промиз
    dom.useTitle("Оформление аренды | Sharead");

    return (
        <Layout className={styles.root}>
            <Header />
            <Layout.Content>
                <Steps current={1} className={styles.rootSteps}>
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
            <Link to="/order">Вернуться к корзине</Link>
            <Typography.Title level={2}>Оформление заказа</Typography.Title>
            <section className={styles.contentSection}>
                <Typography.Title level={3} type="secondary">
                    Оплата
                </Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Средства спишутся с вашего внутреннего кошелька
                </Typography.Text>
                <WalletForm />
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3} type="secondary">
                    Доставка
                </Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Укажите и проверьте способ и адрес доставки
                </Typography.Text>
                <DeliveryForm />
            </section>
        </Layout>
    );
};

const WalletForm = () => {
    const order = useOrder();
    return (
        <Row gutter={[0, 20]} className={styles.wallet} justify="center">
            {order.isEnoughMoney ? (
                <Result status="success" title="На счете достаточно средств" />
            ) : (
                <Result
                    status="warning"
                    title="На счете недостаточно средств"
                    extra={<Wallet.AddFunds.Form />}
                />
            )}
        </Row>
    );
};
const DeliveryForm = () => (
    <Row className={styles.delivery} justify="space-between">
        <Col span={10} className={styles.deliveryForm}>
            <Typography.Title level={4}>Выберите адрес доставки</Typography.Title>
            <Input placeholder="Искать на карте..." />
        </Col>
        <Col span={12} className={styles.deliveryMap}>
            <YMaps>
                <Map
                    defaultState={{ center: [55.79, 49.12], zoom: 14 }}
                    width="100%"
                    height="100%"
                    options={{ autoFitToViewport: "always" }}
                />
            </YMaps>
        </Col>
    </Row>
);

const CartMini = () => {
    const order = useOrder();
    return (
        <Row justify="space-between" gutter={[0, 30]} className={styles.cart}>
            {order.books.map((book) => (
                <Col key={book.id} span={11}>
                    <Link to={`/book/${book.id}`} title={book.name}>
                        <BookCard data={book} size="mini" className={styles.cartItem} />
                    </Link>
                </Col>
            ))}
        </Row>
    );
};

// eslint-disable-next-line max-lines-per-function
const Sidebar = () => {
    const order = useOrder();
    const history = useHistory();

    return (
        <Layout.Sider className={styles.sidebar} width={400}>
            <div className={styles.sidebarCard}>
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
                    <Button
                        block
                        type="primary"
                        style={{ height: 50 }}
                        disabled={!order.isEnoughMoney}
                        title={order.isEnoughMoney ? "" : "Недостаточно средств для оплаты"}
                        onClick={() =>
                            order.payment
                                .applyTransaction(-order.price)
                                .then(() => history.push("/order/success"))
                        }
                        loading={order.payment.isPending}
                    >
                        Оплатить заказ
                    </Button>
                </section>
            </div>
            <div className={cn(styles.sidebarCard, styles.cartContainer)}>
                <Typography.Title level={4} type="secondary">
                    Ваш заказ
                </Typography.Title>
                <CartMini />
            </div>
        </Layout.Sider>
    );
};

export default CheckoutPage;
