import {
    Typography,
    Layout,
    Row,
    Button,
    Result,
    Input,
    Col,
    DatePicker,
    Select,
    Checkbox,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import { YMaps, Map } from "react-yandex-maps";
import { useState } from "react";
import dayjs from "dayjs";
// !!! FIXME: temp!;
import moment from "moment";

import { Header, Footer, Wallet, Cart } from "features";
import { orderModel } from "entities/order";
import { viewerModel } from "entities/viewer";
import { fakeApi } from "shared/api";
import { dom } from "shared/lib";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

const useCheckoutValidation = () => {
    const { price } = orderModel.cart.useOrder();
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
                <Cart.Steps.View current={1} className={styles.rootSteps} />
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

// eslint-disable-next-line max-lines-per-function
const DeliveryForm = () => {
    const [mode, setMode] = useState<"MANUAL" | "COFFESHOP">("MANUAL");
    const [address, setAddress] = useState<string | undefined>();
    const [date, setDate] = useState<string | undefined>();

    const shopsQuery = fakeApi.coffeeshops.getAll();
    const shopsOptions = shopsQuery.map((cs) => ({
        value: String(cs.id),
        label: (
            <article>
                <b>{cs.name}</b>
                <ul>
                    <li>{cs.address}</li>
                    <li>{dayjs(cs.deliveryAt).format("DD/MM/YYYY")}</li>
                </ul>
            </article>
        ),
    }));

    return (
        <Row className={styles.delivery} justify="space-between">
            <Col span={10} className={styles.deliveryForm}>
                <Typography.Title level={4}>Выберите способ доставки</Typography.Title>
                <Checkbox
                    onChange={(e) => {
                        setAddress(undefined);
                        setDate(undefined);
                        setMode(e.target.checked ? "COFFESHOP" : "MANUAL");
                    }}
                    checked={mode === "COFFESHOP"}
                    style={{ marginBottom: 20 }}
                >
                    Получить на ближайшем митапе в кофейне
                </Checkbox>
                {mode === "MANUAL" && (
                    <>
                        <Input
                            key={mode}
                            placeholder="Выбрать адрес доставки..."
                            defaultValue={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <DatePicker
                            placeholder="Выбрать время доставки..."
                            style={{ width: "100%", marginTop: 20 }}
                            value={date ? moment(date) : undefined}
                            onChange={(value) => setDate(value?.toISOString())}
                        />
                    </>
                )}
                {mode === "COFFESHOP" && (
                    <>
                        <Select
                            options={shopsOptions}
                            style={{ width: "100%" }}
                            placeholder="Выберите кофейню..."
                            onSelect={(value) => {
                                const shop = shopsQuery.find((cs) => String(cs.id) === value);
                                if (!shop) return;
                                setAddress(shop.address);
                                setDate(shop.deliveryAt);
                            }}
                        />
                    </>
                )}
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
};

const Sidebar = () => {
    const viewer = viewerModel.useViewerWallet();
    const order = orderModel.cart.useOrder();
    const validation = useCheckoutValidation();
    const history = useHistory();

    return (
        <Layout.Sider className={styles.sidebar} width={400}>
            <Cart.TotalInfo.Card>
                <Button
                    block
                    type="primary"
                    style={{ height: 50 }}
                    disabled={!validation.isEnoughMoney}
                    title={validation.message}
                    onClick={() =>
                        viewer.payment.applyTransaction(-order.price).then(() => {
                            orderModel.cart.events.submitOrder();
                            history.push("/order/result");
                        })
                    }
                    loading={viewer.payment.isPending}
                >
                    Оплатить заказ
                </Button>
            </Cart.TotalInfo.Card>
            <Cart.TotalInfo.CartMini />
        </Layout.Sider>
    );
};

export default CheckoutPage;
