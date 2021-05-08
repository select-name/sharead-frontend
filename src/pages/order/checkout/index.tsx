import { Typography, Layout, Row, Button, Result, Input, Col } from "antd";
import { Link, useHistory } from "react-router-dom";
import { YMaps, Map } from "react-yandex-maps";

import { Header, Footer, Wallet, Order } from "features";
import { orderModel } from "entities/order";
import * as viewerModel from "entities/viewer";
import { dom } from "shared/lib";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

const useCheckoutValidation = () => {
    const { price } = orderModel.books.useOrder();
    const { wallet } = viewerModel.useViewerWallet();
    const isEnoughMoney = wallet >= price;
    const message = isEnoughMoney ? "" : "Недостаточно средств для оплаты";
    return { isEnoughMoney, message };
};

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
                <Order.Steps.View current={1} className={styles.rootSteps} />
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
    const validation = useCheckoutValidation();
    return (
        <Row gutter={[0, 20]} className={styles.wallet} justify="center">
            {validation.isEnoughMoney ? (
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

const Sidebar = () => {
    const viewer = viewerModel.useViewerWallet();
    const order = orderModel.books.useOrder();
    const validation = useCheckoutValidation();
    const history = useHistory();

    return (
        <Layout.Sider className={styles.sidebar} width={400}>
            <Order.TotalInfo.Card>
                <Button
                    block
                    type="primary"
                    style={{ height: 50 }}
                    disabled={!validation.isEnoughMoney}
                    title={validation.message}
                    onClick={() =>
                        viewer.payment.applyTransaction(-order.price).then(() => {
                            orderModel.events.submitOrder();
                            history.push("/order/result");
                        })
                    }
                    loading={viewer.payment.isPending}
                >
                    Оплатить заказ
                </Button>
            </Order.TotalInfo.Card>
            <Order.TotalInfo.CartMini />
        </Layout.Sider>
    );
};

export default CheckoutPage;
