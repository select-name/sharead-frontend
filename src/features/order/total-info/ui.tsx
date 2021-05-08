import { Typography, Row, Divider } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import pluralize from "plural-ru";

import { orderModel } from "entities/order";
import styles from "./styles.module.scss";

export const Form = () => {
    const order = orderModel.useOrder();
    return (
        <section className={styles.section}>
            <Row justify="space-between" align="middle">
                <Typography.Title level={4}>Итого</Typography.Title>
                <Typography.Title level={4} style={{ margin: 0 }}>
                    {order.price} ₽
                </Typography.Title>
            </Row>
            <Row align="middle" className={styles.details}>
                <BookOutlined />
                &nbsp;
                <Typography.Text type="secondary">
                    {pluralize(order.books.length, "%d книга", "%d книги", "%d книг")}
                </Typography.Text>
            </Row>
            <Row align="middle" className={styles.details}>
                <ClockCircleOutlined />
                &nbsp;
                <Typography.Text type="secondary">На 2-3 недели</Typography.Text>
            </Row>
        </section>
    );
};

type Props = {
    children?: import("react").ReactNode;
};
export const Card = ({ children }: Props) => {
    return (
        <article className={styles.root}>
            <Form />
            <Divider style={{ margin: 0 }} />
            <section className={styles.section}>{children}</section>
        </article>
    );
};
