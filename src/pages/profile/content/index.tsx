import { Layout, Button } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ShoppingOutlined,
    PlusOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

import { Fav, Cart } from "features";
import { viewerModel, viewerLib } from "entities/viewer";
import * as lib from "../lib";
import { TOPIC_CLOSED, TOPIC_MY, TOPIC_OPENED, TOPIC_RESERVED, TOPIC_FAV } from "../config";
import { Section } from "./section";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
export const Content = () => {
    const viewerNrml = viewerModel.useViewerNormalized();
    const favBooks = viewerModel.useFavBooks();
    const currentAnchor = useLocation().hash.slice(1);

    return (
        <Layout className={styles.root}>
            <Section
                id={TOPIC_MY.id}
                title={TOPIC_MY.fullTitle}
                description={TOPIC_MY.description}
                books={viewerNrml.ownBooks}
                Icon={DollarOutlined}
                active={TOPIC_MY.id === currentAnchor}
                titleAfter={
                    <Button title="Добавить книгу в сервис" icon={<PlusOutlined />} type="primary">
                        Добавить
                    </Button>
                }
                renderBookDetails={(b) => {
                    const bookInfo = viewerLib.getMyBookInfo(b);
                    return (
                        <ul>
                            <li>{lib.STATUSES[bookInfo.status]}</li>
                            <li>Заработано {bookInfo.earned} ₽</li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_OPENED.id}
                title={TOPIC_OPENED.fullTitle}
                description={TOPIC_OPENED.description}
                books={viewerNrml.openedBooks}
                Icon={ShoppingOutlined}
                active={TOPIC_OPENED.id === currentAnchor}
                renderBookDetails={(_, idx) => {
                    const order = viewerNrml.opened[idx];

                    return (
                        <ul>
                            <li>{lib.STATUSES[order.status]}</li>
                            <li>{viewerLib.getOrderInfo(order)}</li>
                        </ul>
                    );
                }}
            />
            <Section
                id={TOPIC_RESERVED.id}
                title={TOPIC_RESERVED.fullTitle}
                description={TOPIC_RESERVED.description}
                books={viewerNrml.reservedBooks}
                Icon={ClockCircleOutlined}
                active={TOPIC_RESERVED.id === currentAnchor}
                getRibbonProps={(_, idx) => {
                    const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx]);

                    if (reserve.couldBeRent) {
                        return { color: "orange", text: "Подошла ваша очередь!" };
                    }
                    return {
                        color: "lightslategray",
                        text: `Номер в очереди: ${reserve.queryIdx + 1}`,
                    };
                }}
                renderBookDetails={(_, idx) => {
                    const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx]);

                    if (reserve.couldBeRent) {
                        return (
                            <p>
                                Сделайте заказ в течение двух дней, чтобы не потерять свою очередь
                            </p>
                        );
                    }
                    return (
                        <span>
                            Время ожидания: ~ <b>{viewerLib.getDaysLabel(reserve.awaitTime)}</b>
                        </span>
                    );
                }}
                renderBookActions={(b, idx) => {
                    const reserve = viewerLib.getReservationInfo(viewerNrml.reserved[idx]);
                    return [
                        <Cart.Actions.AddBookMini
                            key="cart"
                            bookId={b.id}
                            disabled={!reserve.couldBeRent}
                        />,
                    ];
                }}
            />
            <Section
                id={TOPIC_FAV.id}
                title={TOPIC_FAV.fullTitle}
                description={TOPIC_FAV.description}
                books={favBooks}
                Icon={HeartOutlined}
                active={TOPIC_FAV.id === currentAnchor}
                renderBookActions={(b) => [<Fav.Actions.AddBookMini key="fav" bookId={b.id} />]}
            />
            <Section
                id={TOPIC_CLOSED.id}
                title={TOPIC_CLOSED.fullTitle}
                description={TOPIC_CLOSED.description}
                books={viewerNrml.closedBooks}
                Icon={CheckCircleOutlined}
                active={TOPIC_CLOSED.id === currentAnchor}
            />
        </Layout>
    );
};
