import React from "react";
import { Layout } from "antd";
import cn from "classnames";
import Routing from "pages";
import styles from "./styles.module.scss";
import "./index.scss";

function App() {
    return (
        <div className={styles.h100}>
            <Layout className={styles.h100}>
                <Layout.Header className={styles.header}>
                    <h1>sharead</h1>
                </Layout.Header>
                <Layout.Content className={cn(styles.h100, styles.content)}>
                    <Routing />
                </Layout.Content>
                <Layout.Footer className={styles.footer}>
                    Sharead ©2021 Created by SelectName team
                </Layout.Footer>
            </Layout>
        </div>
    );
}

export default App;
