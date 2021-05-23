import { Layout, Button, Result } from "antd";
import { Link } from "react-router-dom";

import { Header, Footer, Cart } from "features";
import { dom } from "shared/lib";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Страница результата оформления заказа
 */
const ResultPage = () => {
    // FIXME: Сделать позже через промиз
    dom.useTitle("Аренда успешно оформлена! | Sharead");

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

export default ResultPage;
