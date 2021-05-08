import { Typography, Row, Divider, Col } from "antd";
import { BookOutlined, ClockCircleOutlined } from "@ant-design/icons";
import cn from "classnames";
import { Link } from "react-router-dom";
import pluralize from "plural-ru";

import { orderModel } from "entities/order";
import { BookCard } from "entities/book";
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

export const CartMini = () => {
    const order = orderModel.useOrder();

    return (
        <article className={cn(styles.root, styles.cartContainer)}>
            <Typography.Title level={4} type="secondary">
                Ваш заказ
            </Typography.Title>
            <Row justify="space-between" gutter={[0, 30]} className={styles.cart}>
                {order.books.map((book) => (
                    <Col key={book.id} span={11}>
                        <Link to={`/book/${book.id}`} title={book.name}>
                            <BookCard data={book} size="mini" className={styles.cartItem} />
                        </Link>
                    </Col>
                ))}
            </Row>
        </article>
    );
};
