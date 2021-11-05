import { Layout, Button, Result } from "antd";
import { HashLink as Link } from "react-router-hash-link";

// import { orderModel } from "entities/order";
import { Header, Footer } from "widgets";
import { Cart } from "features";
import { dom } from "shared/lib";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Страница результата оформления заказа
 */
const ResultPage = () => {
    // const { isEmptyCart } = orderModel.cart.useOrderValidation();
    // FIXME: Сделать позже через промиз
    dom.useTitle("Аренда успешно оформлена! | Sharead");
    // hooks.useRedirectOn(isEmptyCart, "/order");

    return (
        <Layout className={styles.root}>
            <Header />
            <Layout.Content>
                <Cart.Steps.View current={2} className={styles.rootSteps} />
                <Layout>
                    <Result
                        status="success"
                        title="Заказ успешно оплачен и оформлен!"
                        subTitle="Ожидайте доставки в течение указанного в заказе времени"
                        extra={[
                            <Link to="/profile#opened" key="order">
                                <Button type="primary">Перейти к заказу</Button>
                            </Link>,
                            <Link to="/catalog" key="catalog">
                                <Button>В каталог</Button>,
                            </Link>,
                        ]}
                    />
                </Layout>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

export default ResultPage;
