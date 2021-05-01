import { Carousel, Typography, Layout, Row, Col } from "antd";
import { BookFilled, UserOutlined } from "@ant-design/icons";

import { Header, Footer } from "features";
import * as fapi from "shared/fixtures";
// eslint-disable-next-line no-restricted-imports
import { useTitle } from "shared/lib/dom";
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
                    <Typography.Title className={styles.title} level={2}>
                        Категории книг
                    </Typography.Title>
                    <Categories />
                </section>
                <section className={styles.rootSection}>
                    <Typography.Title className={styles.title} level={2}>
                        Популярные авторы
                    </Typography.Title>
                    <Authors />
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

const Categories = () => {
    const categoriesQuery = fapi.categories.getAll();

    return (
        <Row className={styles.categories} justify="space-between">
            {categoriesQuery.map((cat) => (
                <Col key={cat.id} className={styles.categoriesItem} span={7}>
                    {/* TODO: Добавить позже фильрацию по категориям + ссылку на страницы */}
                    <Typography.Title level={3}>{cat.name}</Typography.Title>
                    <Typography.Text>{cat.description}</Typography.Text>
                    <div className={styles.categoriesItemCover}>
                        <BookFilled {...cat.cover} />
                    </div>
                </Col>
            ))}
        </Row>
    );
};

const Authors = () => {
    const authorsQuery = fapi.authors.getPopular();

    return (
        <Row className={styles.authors} justify="space-around">
            {authorsQuery.map((au) => (
                <Col key={au.id} className={styles.authorsItem} span={3}>
                    {/* TODO: Добавить позже фильрацию по категориям + ссылку на страницы */}
                    <Typography.Title level={4}>{fapi.authors.getShortname(au)}</Typography.Title>
                    {/* <Typography.Text>{cat.description}</Typography.Text> */}
                    <div className={styles.authorsItemCover}>
                        <UserOutlined {...au.avatar} />
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default IndexPage;
