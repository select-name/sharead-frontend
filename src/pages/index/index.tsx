import { Carousel, Typography, Layout, Row, Col } from "antd";
// import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { Header, Footer } from "widgets";
import { useHistory, Link } from "react-router-dom";
import { BookCard } from "entities/book";
import { fakeApi } from "shared/api";
import { useTitle } from "shared/lib/dom";
import imgBanner1 from "./b1.jpg";
import imgBanner2 from "./b2.jpg";
import imgBanner3 from "./b3.jpg";
import imgCat1 from "./c1.png";
import imgCat2 from "./c2.png";
import imgCat3 from "./c3.png";
import imgOrwell from "./orwell.jpg";
import imgPalanick from "./palanick.jpg";
import imgTaleb from "./taleb.jpg";
import imgTolstoy from "./tolstoy.jpg";
import imgIlyahov from "./ilyahov.jpg";
// eslint-disable-next-line no-restricted-imports
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Индексовая страница
 */
// eslint-disable-next-line max-lines-per-function
const IndexPage = () => {
    useTitle("Sharead - Букшеринг сервис");
    return (
        <Layout>
            <Header />
            <Layout.Content>
                <section className={styles.rootSection}>
                    <Banner />
                </section>
                <section className={styles.rootSection}>
                    <Typography.Title className={styles.rootSectionTitle} level={2}>
                        Категории книг
                    </Typography.Title>
                    <Categories />
                </section>
                <section className={styles.rootSection}>
                    <Typography.Title className={styles.rootSectionTitle} level={2}>
                        Популярные авторы
                    </Typography.Title>
                    <Authors />
                </section>
                <section className={styles.rootSection}>
                    <Typography.Title className={styles.rootSectionTitle} level={2}>
                        Популярные книги
                    </Typography.Title>
                    <Books />
                </section>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

const Banner = () => (
    <Carousel
        autoplay
        autoplaySpeed={7000}
        // arrows
        // nextArrow={<ArrowRightOutlined />}
        // prevArrow={<ArrowLeftOutlined />}
    >
        <div className={styles.bannerItem}>
            <Typography.Text className={styles.bannerItemText}>
                <h3 style={{ color: "#fff" }}>Книжный митап #4</h3>
                <p>Coffeeshop Company (Венская кофейня)</p>
                <p>ул. Баумана, д.38/17, {dayjs().add(7, "days").format("DD.MM.YYYY")}</p>
                <i>Там вы можете получить последние заказанные книги!</i>
            </Typography.Text>
            <img src={imgBanner1} alt="img-banner-1" width="100%" />
        </div>
        <div className={styles.bannerItem}>
            <Typography.Text className={styles.bannerItemText}>
                <h3 style={{ color: "#fff" }}>Каталог</h3>
                <p>Гибкий поиск по фильтрам и с подходящей сортировкой</p>
                <p>С адаптацией под ваши финансовые ожидания и время аренды</p>
                <Link to="/catalog">Перейти</Link>
            </Typography.Text>
            <img src={imgBanner2} alt="img-banner-2" width="100%" />
        </div>
        <div className={styles.bannerItem}>
            <Typography.Text className={styles.bannerItemText}>
                <h3 style={{ color: "#fff" }}>Личный кабинет</h3>
                <p>
                    В личном кабинете вы можете увидеть информацию о ваших личных книгах, книгах на
                    руках, забронированных, избранных, а также в целом - об истории аренды
                </p>
                <p>Там же вы найдете и остальные, интересующие вас моменты</p>
                <Link to="/profile">Перейти</Link>
            </Typography.Text>
            <img src={imgBanner3} alt="img-banner-3" width="100%" />
        </div>
    </Carousel>
);

// FIXME: Озон прости, это временно...
const srcCategoriesMap: Record<number, string> = {
    1: imgCat3,
    2: imgCat2,
    3: imgCat1,
};

const Categories = () => {
    const categoriesQuery = fakeApi.categories.getAll();
    const history = useHistory();

    return (
        <Row className={styles.categories} justify="space-between">
            {categoriesQuery.map((cat) => (
                <Col
                    key={cat.id}
                    className={styles.categoriesItem}
                    span={7}
                    // FIXME: hardcoded param!
                    onClick={() => history.push(`/catalog?cat=${cat.id}`)}
                    title="Переход к книгам по категории"
                >
                    {/* TODO: Добавить позже фильрацию по категориям + ссылку на страницы */}
                    <div className={styles.categoriesItemText}>
                        <Typography.Title level={3} className={styles.text}>
                            {cat.name}
                        </Typography.Title>
                        <Typography.Text className={styles.text}>{cat.description}</Typography.Text>
                    </div>
                    <div className={styles.categoriesItemCover}>
                        <img src={srcCategoriesMap[cat.id]} alt="logo" />
                        {/* <BookFilled {...cat.cover} /> */}
                    </div>
                </Col>
            ))}
        </Row>
    );
};

const srcAuthorsMap: Record<number, string> = {
    7: imgIlyahov,
    2: imgPalanick,
    3: imgTaleb,
    10: imgOrwell,
    1: imgTolstoy,
};
const Authors = () => {
    const authorsQuery = fakeApi.authors.getPopular();
    const history = useHistory();

    return (
        <Row className={styles.authors} justify="space-around">
            {authorsQuery.map((au) => (
                <Col
                    key={au.id}
                    className={styles.authorsItem}
                    span={3}
                    // FIXME: hardcoded param!
                    onClick={() => history.push(`/catalog?authors=${au.id}`)}
                    title="Перейти к книгам автора"
                >
                    {/* TODO: Добавить позже фильрацию по категориям + ссылку на страницы */}
                    <Typography.Title level={4} className={styles.authorsItemTitle}>
                        {fakeApi.authors.getShortname(au)}
                    </Typography.Title>
                    <div className={styles.authorsItemCover}>
                        {/* <UserOutlined {...au.avatar} /> */}
                        <img src={srcAuthorsMap[au.id]} alt="Logo" width={200} />
                    </div>
                </Col>
            ))}
        </Row>
    );
};

const Books = () => {
    const booksQuery = fakeApi.books.getPopular();

    return (
        <Row className={styles.books} justify="space-between">
            {booksQuery.map((book) => (
                <Col key={book.id} className={styles.booksItem} span={6}>
                    <BookCard data={book} size="small" className={styles.booksItemCard} />
                </Col>
            ))}
        </Row>
    );
};

export default IndexPage;
