import { Typography, Layout } from "antd";

import { Header } from "features/header";
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
    return (
        <Layout>
            <Header />
            <div className={styles.root}>
                <Typography.Title className={styles.title} level={2}>
                    Каталог книг
                </Typography.Title>
                <Layout className={styles.catalog}>
                    <Content />
                    <Sidebar />
                </Layout>
            </div>
        </Layout>
    );
};

export default CatalogPage;
