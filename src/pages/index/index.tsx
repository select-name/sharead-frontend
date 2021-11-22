import { Layout } from "antd";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useTitle } from "shared/lib/dom";
import { Sections } from "./sections";

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
            <Sections />
            <Footer />
        </Layout>
    );
};

export default IndexPage;
