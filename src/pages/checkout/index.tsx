import { Steps, Typography, Layout, Row, Col, Divider, Button } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Header, Footer } from "features";
import { dom } from "shared/lib";
import { SkeletonСard } from "shared/ui";
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
                    <Steps.Step
                        title={<Link to="/cart">Корзина</Link>}
                        description="Проверьте свой выбор"
                    />
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
            <Typography.Title level={2}>Оформление заказа</Typography.Title>
            <section className={styles.contentSection}>
                <Typography.Title level={3} type="secondary">
                    Способ оплаты
                </Typography.Title>
                <Typography.Text className={styles.contentSectionDescription} type="secondary">
                    Укажите и проверьте платежные данные перед оплатой
                </Typography.Text>
                <Row gutter={[0, 20]}>
                    <SkeletonСard height={300} />
                </Row>
            </section>
            <section className={styles.contentSection}>
                <Typography.Title level={3} type="secondary">
                    Способ доставки
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
    return (
        <Layout.Sider className={styles.sidebarContainer} width={400}>
            <div className={styles.sidebar}>
                <section className={styles.sidebarSection}>
                    <Row justify="space-between" align="middle">
                        <Typography.Title level={4}>Итого</Typography.Title>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            500 ₽
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
                    <Button block type="primary" style={{ height: 50 }}>
                        Оплатить заказ
                    </Button>
                </section>
            </div>
        </Layout.Sider>
    );
};

export default CheckoutPage;
