import { Typography, Layout } from "antd";

import { Header, Footer } from "features";
import { dom } from "shared/lib";
import Content from "./content";
import styles from "./styles.module.scss";
import Sidebar from "./sidebar";

// !!! FIXME: split by features!
// TODO: Add skeletons loader

/**
 * @page Каталог книг
 */
// eslint-disable-next-line max-lines-per-function
const CatalogPage = () => {
    dom.useTitle("Каталог книг — Sharead");

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
