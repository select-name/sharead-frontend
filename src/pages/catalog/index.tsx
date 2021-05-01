import { Typography, Layout } from "antd";

import { Header, Footer } from "features";
// eslint-disable-next-line no-restricted-imports
import { useTitle } from "shared/lib/dom";
import Content from "./content";
import Sidebar from "./sidebar";
// FIXME: Не умеет обрабатывать jpg!
// import ImgPlaceholder from "./book-placeholder.jpg";
import styles from "./styles.module.scss";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Каталог книг
 */
// eslint-disable-next-line max-lines-per-function
const CatalogPage = () => {
    useTitle("Каталог книг — Sharead");

    return (
        <Layout>
            <Header />
            <Layout.Content className={styles.root}>
                <Typography.Title className={styles.title} level={2}>
                    Каталог книг
                </Typography.Title>
                <Layout className={styles.catalog}>
                    <Content />
                    <Sidebar />
                </Layout>
            </Layout.Content>
            <Footer />
        </Layout>
    );
};

export default CatalogPage;
