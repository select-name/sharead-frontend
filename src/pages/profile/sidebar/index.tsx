import { Layout, Anchor } from "antd";
import styles from "./styles.module.scss";

export const Sidebar = () => {
    return (
        <Layout.Sider width={150}>
            <Anchor className={styles.anchor}>
                <Anchor.Link href="#my" title="Мои книги" />
                <Anchor.Link href="#opened" title="В аренде" />
                <Anchor.Link href="#reserved" title="Забронированы" />
                <Anchor.Link href="#closed" title="История аренды" />
            </Anchor>
        </Layout.Sider>
    );
};
