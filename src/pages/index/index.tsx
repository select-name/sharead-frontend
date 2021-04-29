import { Carousel, Typography, Layout, Skeleton, Row, Col } from "antd";

import { Header } from "features/header";
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
            <main className={styles.root}>
                <section className={styles.banner}>
                    <Banner />
                </section>
                <section>
                    <Typography.Title className={styles.title} level={2}>
                        Категории книг
                    </Typography.Title>
                    <Categories />
                </section>
            </main>
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

const Categories = () => (
    <Row className={styles.skeletonZone}>
        <Col span={6} offset={1}>
            <Skeleton.Input className={styles.skeletonItem} size="large" active />
            <Skeleton.Input className={styles.skeletonItem} size="large" active />
        </Col>
        <Col span={6} offset={1}>
            <Skeleton.Input className={styles.skeletonItem} size="large" active />
            <Skeleton.Input className={styles.skeletonItem} size="large" active />
        </Col>
        <Col span={6} offset={1}>
            <Skeleton.Input className={styles.skeletonItem} size="large" active />
            <Skeleton.Input className={styles.skeletonItem} size="large" active />
        </Col>
    </Row>
);

export default IndexPage;
