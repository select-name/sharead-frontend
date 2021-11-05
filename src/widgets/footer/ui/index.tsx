import { Layout } from "antd";
import styles from "./styles.module.scss";

const Footer = () => (
    <Layout.Footer className={styles.root}>
        Sharead ©2021 Created by{" "}
        <a href="https://github.com/select-name/sharead-frontend" target="_blank" rel="noreferrer">
            SelectName team
        </a>
    </Layout.Footer>
);

export default Footer;
