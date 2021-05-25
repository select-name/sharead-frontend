import { Carousel, Typography, Layout, Row, Col } from "antd";
// import { BookFilled } from "@ant-design/icons";

import { Header, Footer } from "features";
import { useHistory } from "react-router-dom";
import { BookCard } from "entities/book";
import { fakeApi } from "shared/api";
import { useTitle } from "shared/lib/dom";
import imgCat1 from "./1.png";
import imgCat2 from "./2.png";
import imgCat3 from "./3.png";
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
    <Carousel autoplay>
        <div className={styles.bannerItem}>
            <Typography.Title level={3}>BANNER-1</Typography.Title>
        </div>
        <div className={styles.bannerItem}>
            <Typography.Title level={3}>BANNER-2</Typography.Title>
        </div>
        <div className={styles.bannerItem}>
            <Typography.Title level={3}>BANNER-3</Typography.Title>
        </div>
        <div className={styles.bannerItem}>
            <Typography.Title level={3}>BANNER-4</Typography.Title>
        </div>
    </Carousel>
);

// FIXME: Озон прости, это временно...
const srcCatMap: Record<number, string> = {
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
                        <img src={srcCatMap[cat.id]} alt="logo" />
                        {/* <BookFilled {...cat.cover} /> */}
                    </div>
                </Col>
            ))}
        </Row>
    );
};

const srcMap: Record<number, string> = {
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
                        <img src={srcMap[au.id]} alt="Logo" width={200} />
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
