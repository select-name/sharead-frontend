import { Layout } from "antd";
import cn from "classnames";

import Routing from "pages";
// import { Header } from "features/header";
import { withHocs } from "./hocs";
import styles from "./styles.module.scss";
import "./index.scss";

function App() {
    return (
        <div className={styles.h100}>
            <Layout>
                {/* <Header /> */}
                <Layout.Content className={cn(styles.content)}>
                    <Routing />
                </Layout.Content>
                <Layout.Footer className={styles.footer}>
                    Sharead ©2021 Created by{" "}
                    <a href="https://github.com/select-name" target="_blank" rel="noreferrer">
                        SelectName team
                    </a>
                </Layout.Footer>
            </Layout>
        </div>
    );
}

export default withHocs(App);
