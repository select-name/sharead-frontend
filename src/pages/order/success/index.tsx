import { Steps, Layout, Button, Result } from "antd";
import { Link } from "react-router-dom";

import { Header, Footer } from "features";
import { dom } from "shared/lib";
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
                <Steps current={2} className={styles.rootSteps}>
                    <Steps.Step title="Корзина" description="Проверьте свой выбор" />
                    <Steps.Step title="Оформление" description="Выбор оплаты, доставки" />
                    <Steps.Step title="Доставка" description="Получение заказа" />
                </Steps>
                <Layout>
                    <Result
                        status="success"
                        title="Заказ успешно оплачен и оформлен!"
                        subTitle="Ожидайте доставки в течение указанного в заказе времени"
                        extra={[
                            <Link to="/profile" key="order">
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

export default CheckoutPage;
