import { Typography, Layout, Avatar, Divider } from "antd";
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { Wallet } from "features";
import { useViewer } from "entities/viewer";
import { Tile } from "shared/ui";
import * as lib from "../lib";
import styles from "./styles.module.scss";

// eslint-disable-next-line max-lines-per-function
export const Aside = () => {
    const viewer = useViewer();

    /* FIXME: move to entitites */
    return (
        <Layout.Sider className={styles.asideContainer} width={400}>
            <div className={styles.aside}>
                <section className={styles.asideMain}>
                    <Avatar size={128} icon={<UserOutlined />} />
                    <Typography.Title level={3}>
                        {viewer.firstName} {viewer.lastName}
                    </Typography.Title>
                    <Typography.Text>
                        {viewer.email}&nbsp;
                        <EmailVerified emailVerified={viewer.emailVerified} />
                    </Typography.Text>
                    {/* <Typography.Text>FIXME: В сервисе с 2 мая 2021</Typography.Text> */}
                    {/* <Typography.Text>10 закрытых сделок</Typography.Text> */}
                </section>
                <Divider />
                <section>
                    <Wallet.AddFunds.Popover
                        placement="right"
                        buttonStyle={{ fontSize: 30, height: 60, width: "100%" }}
                    />
                </section>
                <Divider />
                <section>
                    {/* <Typography.Title level={4}>С нашим сервисом</Typography.Title> */}
                    <Tile.Group data={lib.getStats(viewer)} itemSpan={11} />
                </section>
            </div>
        </Layout.Sider>
    );
};

const EmailVerified = ({ emailVerified }: { emailVerified: boolean }) => {
    if (emailVerified) {
        return <CheckCircleOutlined title="Почта подтверждена" style={{ color: "green" }} />;
    }

    return <ClockCircleOutlined title="Ожидает подтверждения" style={{ color: "red" }} />;
};
