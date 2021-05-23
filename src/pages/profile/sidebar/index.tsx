import { Layout, Anchor } from "antd";
import { topics } from "../config";
import styles from "./styles.module.scss";

export const Sidebar = () => {
    return (
        <Layout.Sider width={150}>
            <Anchor className={styles.topic}>
                {topics.map((topic) => (
                    <Anchor.Link key={topic.id} href={`#${topic.id}`} title={topic.title} />
                ))}
            </Anchor>
        </Layout.Sider>
    );
};
