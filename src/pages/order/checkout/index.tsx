import { Steps, Typography, Layout, Row, Divider, Button, Result } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Header, Footer, Wallet } from "features";
import { useViewerWallet } from "entities/viewer";
import { dom } from "shared/lib";
import { SkeletonСard } from "shared/ui";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

const useOrder = () => {
    const wallet = useViewerWallet();
    const price = 500;
    const isEnoughMoney = wallet && wallet.moneyCount >= price;
    return { wallet, price, isEnoughMoney };
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
    const order = useOrder();

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
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3} type="secondary">
                    Доставка
                </Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Укажите и проверьте способ и адрес доставки
                </Typography.Text>
                <Row justify="space-between">
                    <SkeletonСard height={600} />
                </Row>
            </section>
        </Layout>
    );
};

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
                    <Link to="/order/success">
                        <Button
                            block
                            type="primary"
                            style={{ height: 50 }}
                            disabled={!order.isEnoughMoney}
                        >
                            Оплатить заказ
                        </Button>
                    </Link>
                </section>
            </div>
        </Layout.Sider>
    );
};

export default CheckoutPage;
