import { Carousel, Typography, Layout, Result, Button, Descriptions, Row, Col } from "antd";
import { HistoryOutlined, InboxOutlined, BookFilled } from "@ant-design/icons";
import { RouteChildrenProps, Link } from "react-router-dom";
import cn from "classnames";

import { Header, Footer, Cart, Fav, Reserve } from "features";
import pluralize from "plural-ru";
import { BookCard } from "entities/book";
import { TariffRadio } from "entities/tariff";
import { orderLib } from "entities/order";
import type { AbstractBook } from "shared/api";
import { fakeApi } from "shared/api";
import { dom, alert } from "shared/lib";
import { BooksModal } from "./modal";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

type RouterProps = RouteChildrenProps<{
    bookId: string;
}>;

type Props = RouterProps;

/**
 * @page Страница книги
 */
// eslint-disable-next-line max-lines-per-function
const BookPage = (props: Props) => {
    const bookId = Number(props.match?.params.bookId);
    const book = fakeApi.books.getById(bookId);

    // FIXME: Сделать позже через промиз
    dom.useTitle(`${book ? book.name : "Книга не найдена"} | Sharead`);

    // !!! TODO: add error page later (or even hoc)
    if (!book) {
        return (
            <Layout>
                <Header />
                <Layout.Content className={cn(styles.errorRoot)}>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Книга не найдена"
                        extra={<Button href="/catalog">К каталогу</Button>}
                    />
                </Layout.Content>
                <Footer />
            </Layout>
        );
    }

    return (
        <Layout className={styles.root}>
            <Header />
            <Layout.Content className={styles.rootContent}>
                <Link to="/catalog">Каталог</Link>
                <Typography.Title className={styles.title} level={2}>
                    {fakeApi.books.toString(book)}
                </Typography.Title>
                <Row className={styles.content}>
                    <Card book={book} />
                    <Checkout book={book} />
                </Row>
                <Row>
                    <Recommendations book={book} />
                </Row>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

type BookProps = {
    book: AbstractBook;
};

// prettier-ignore
const Card = ({ book }: BookProps) => {
    const { authors, publicationYear, publishingHouse } = book;
    const author = authors.map(fakeApi.authors.getShortname).join(", ");

    return (
        <Col className={styles.card} span={16}>
            <div className={styles.cardMain}>
                <div className={styles.cardGallery}>
                    <Carousel>
                        <div className={styles.cardGalleryItem} >
                            <BookFilled style={{ marginTop: 150 }} />
                        </div>
                        <div className={styles.cardGalleryItem} >
                            <BookFilled style={{ marginTop: 150, color: "darkslategray" }} />
                        </div>
                        {/* <div className={styles.cardGalleryItem}>
                            <Typography.Title level={3}>IMG-2</Typography.Title>
                        </div>
                        <div className={styles.cardGalleryItem}>
                            <Typography.Title level={3}>IMG-3</Typography.Title>
                        </div>
                        <div className={styles.cardGalleryItem}>
                            <Typography.Title level={3}>IMG-4</Typography.Title>
                        </div> */}
                    </Carousel>
                </div>
                <div className={styles.cardInfo}>
                    <Descriptions
                        title={<span className={styles.cardInfoPropsTitle}>О книге</span>}
                        className={styles.cardInfoProps}
                        column={1}
                        labelStyle={{ fontWeight: 500, fontSize: 16 }}
                        contentStyle={{ fontSize: 16 }}
                    >
                        <Descriptions.Item label="Автор">{author}</Descriptions.Item>
                        <Descriptions.Item label="Год выпуска">{publicationYear}</Descriptions.Item>
                        <Descriptions.Item label="Издательство">
                            {publishingHouse.name} ({publishingHouse.city})
                        </Descriptions.Item>
                    </Descriptions>
                    <p className={styles.cardInfoDescription}>{book.description}</p>
                </div>
            </div>
        </Col>
    );
};

// eslint-disable-next-line max-lines-per-function
const Checkout = ({ book }: BookProps) => {
    const rent = orderLib.getRentInfo(book.id);
    const style = rent.status !== "RENTABLE" ? { opacity: 0.5 } : {};
    const price = `${fakeApi.books.getPrice(book)} р`;
    // console.debug("BOOK RENT", book.id, rent);

    return (
        <Col span={7} offset={1} className={styles.checkoutContainer} style={style}>
            <article className={styles.checkout}>
                <div>
                    <h3 className={styles.checkoutPrice}>
                        {rent.status === "OWN" && "Ваш экземпляр"}
                        {rent.status === "RENTABLE" && price}
                        {rent.status === "RESERVABLE" && "Можно забронировать"}
                        {rent.status === "OUT_STOCK" && "Нет в наличии"}
                    </h3>
                    <Row style={{ marginTop: 20 }}>
                        {rent.status === "RENTABLE" && (
                            <ul className={styles.checkoutDetails}>
                                <li className={styles.checkoutDetailsItem}>
                                    <InboxOutlined /> Доставка курьерской службой до 2 дней
                                </li>
                                <li className={styles.checkoutDetailsItem}>
                                    <HistoryOutlined /> В аренду до{" "}
                                    {/* FIXME: hardcoded, use entities/tariffs */}
                                    {pluralize(
                                        Math.min(30, rent.duration),
                                        "%d дня",
                                        "%d дней",
                                        "%d дней",
                                    )}
                                </li>
                            </ul>
                        )}
                        {rent.status === "OWN" && (
                            <>
                                <p>
                                    Эта книга относится к одному из экземпляров, которые вы
                                    загрузили на сервис
                                </p>
                                <p>
                                    В целях антифрода, для данной книги вы не сможете сделать бронь
                                    или заказ. Но можете посмотреть аналоги для других издательств и
                                    годов выпуска
                                </p>
                            </>
                        )}
                        {rent.status === "RESERVABLE" && (
                            <>
                                <p>На данный момент все экземпляры этой книги заняты</p>
                                <p>
                                    Вы можете оставить свою бронь на нее, чтобы арендовать, как она
                                    освободится и подойдет ваша очередь
                                </p>
                            </>
                        )}
                        {rent.status === "OUT_STOCK" && (
                            <>
                                <p>
                                    На данный момент в сервисе нет экземпляров этой книги от
                                    пользователей
                                </p>
                                <p>
                                    Вы можете оставить свою бронь на нее, чтобы арендовать, как она
                                    появится и подойдет ваша очередь. Либо же добавить в избранное
                                </p>
                            </>
                        )}
                    </Row>
                </div>
                <div className={styles.checkoutActions}>
                    <Fav.Actions.AddBook bookId={book.id} />
                    {rent.status === "RENTABLE" && <Cart.Actions.AddBook bookId={book.id} />}

                    {rent.status === "RESERVABLE" && (
                        <Reserve.Actions.ReserveBook bookId={book.id} />
                    )}
                    {rent.status === "OUT_STOCK" && (
                        <Reserve.Actions.ReserveBook bookId={book.id} />
                    )}
                    {false && <TariffRadio onChange={alert.info} withTitle={false} disabled />}
                    {false && <BooksModal bookId={book.id} />}
                </div>
            </article>
        </Col>
    );
};

// !!! FIXME: Скроллить наверх при переходе к книге
const Recommendations = ({ book }: BookProps) => {
    const booksQuery = fakeApi.books
        .getList({ filters: { authors: book.authors.map((a) => a.id) } })
        .filter((b) => b.id !== book.id);

    if (!booksQuery.length) return null;

    return (
        <Col span={16} className={styles.recommendations}>
            <h2>От того же автора</h2>
            <Row className={styles.recommendationsFeed} wrap={false} gutter={[20, 0]}>
                {booksQuery.map((b) => (
                    <Col key={b.id} span={8}>
                        <BookCard data={b} size="small" />
                    </Col>
                ))}
            </Row>
        </Col>
    );
};

export default BookPage;
