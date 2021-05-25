import { Carousel, Typography, Layout, Result, Button, Descriptions, Row, Col } from "antd";
import { HistoryOutlined, InboxOutlined } from "@ant-design/icons";
import { RouteChildrenProps, Link } from "react-router-dom";
import cn from "classnames";

import { Header, Footer, Cart, Fav, Reserve } from "features";
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
// eslint-disable-next-line max-len
const MOCK_DESCRIPTION = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa repellendus odio tempore tempora corrupti rerum odit eligendi quisquam dolore cum accusantium quia voluptate, quaerat natus harum doloremque fugit alias aut praesentium molestias iusto veniam laudantium, magni aperiam. Minus dolorem asperiores alias, perspiciatis, ut tempore officia ad ea dolorum ipsum voluptas iste eveniet dicta maiores fuga consequuntur quae voluptatibus porro nihil quas enim earum. Corrupti quo voluptas, quae esse consequatur reiciendis voluptates a odio inventore laudantium dolores perspiciatis itaque rerum sunt omnis consequuntur nesciunt sequi ducimus nemo veniam at! Ad ullam quasi deserunt veritatis amet recusandae nemo veniam perferendis sequi! Earum quis modi repellendus fugit ratione, sunt nobis deserunt rem exercitationem provident officiis quasi nihil nesciunt repellat blanditiis, sed quia voluptatem.";

const Card = ({ book }: BookProps) => {
    const { authors, publicationYear, publishingHouse } = book;
    const author = authors.map(fakeApi.authors.getShortname).join(", ");

    return (
        <Col className={styles.card} span={16}>
            <div className={styles.cardMain}>
                <div className={styles.cardGallery}>
                    <Carousel>
                        <div className={styles.cardGalleryItem}>
                            <Typography.Title level={3}>IMG-1</Typography.Title>
                        </div>
                        <div className={styles.cardGalleryItem}>
                            <Typography.Title level={3}>IMG-2</Typography.Title>
                        </div>
                        <div className={styles.cardGalleryItem}>
                            <Typography.Title level={3}>IMG-3</Typography.Title>
                        </div>
                        <div className={styles.cardGalleryItem}>
                            <Typography.Title level={3}>IMG-4</Typography.Title>
                        </div>
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
                    <p className={styles.cardInfoDescription}>{MOCK_DESCRIPTION}</p>
                </div>
            </div>
        </Col>
    );
};

const Checkout = ({ book }: BookProps) => {
    const rent = orderLib.getRentInfo(book.id);
    const style =
        rent.status === "OUT_STOCK" || rent.status === "RESERVABLE" ? { opacity: 0.5 } : {};
    const price = `${fakeApi.books.getPseudoPrice(book)} р`;

    return (
        <Col span={7} offset={1} className={styles.checkoutContainer} style={style}>
            <article className={styles.checkout}>
                <div>
                    <h3 className={styles.checkoutPrice}>
                        {rent.status === "RENTABLE" && price}
                        {rent.status === "RESERVABLE" && "Можно забронировать"}
                        {rent.status === "OUT_STOCK" && "Нет в наличии"}
                    </h3>
                    {/* FIXME: Добавить динамику */}
                    <ul className={styles.checkoutDetails}>
                        <li className={styles.checkoutDetailsItem}>
                            <InboxOutlined /> Доставка курьерской службой до 2 дней
                        </li>
                        <li className={styles.checkoutDetailsItem}>
                            <HistoryOutlined /> В аренду от 2 дней
                        </li>
                    </ul>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem magnam
                        fugiat et vel aspernatur temporibus!
                    </p>
                </div>
                <div className={styles.checkoutActions}>
                    <Fav.Actions.AddBook bookId={book.id} />
                    {rent.status === "RENTABLE" && <Cart.Actions.AddBook bookId={book.id} />}

                    {rent.status === "RESERVABLE" && (
                        <Reserve.Actions.ReserveBook bookId={book.id} />
                    )}
                    {false && <TariffRadio onChange={alert.info} withTitle={false} disabled />}
                    {/* FIXME: @temp */}
                    {false && <BooksModal bookId={book.id} />}
                </div>
            </article>
        </Col>
    );
};

// !!! FIXME: Скроллить наверх при переходе к книге
const Recommendations = ({ book }: BookProps) => {
    const booksQuery = fakeApi.books
        .getList({ authors: book.authors.map((a) => a.id) })
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
