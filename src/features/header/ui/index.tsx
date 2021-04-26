import cn from "classnames";
import { Layout } from "antd";
import {
    HeartOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import Search from "./search";
import styles from "./styles.module.scss";

type Props = {
    // stickable?: boolean;
    className?: string;
    // theme?: "normal" | "transparent";
};

const actions = [
    {
        label: "Заказы",
        Icon: FolderOpenOutlined,
        url: "#orders",
    },
    {
        label: "Избранное",
        Icon: HeartOutlined,
        url: "#fav",
    },
    {
        label: "Корзина",
        Icon: ShoppingCartOutlined,
        url: "#cart",
    },
    {
        label: "Профиль",
        Icon: UserOutlined,
        url: "#profile",
    },
];

const Header = (props: Props) => {
    const { className } = props;

    return (
        <Layout.Header className={cn(styles.root, className)}>
            <Link className={styles.logo} to="/">
                <Logo width={24} />
                <h1 className={styles.logoTitle}>sharead</h1>
            </Link>
            <div className={styles.search}>
                <Search />
            </div>
            {/* TODO: add amount-label later */}
            <div className={styles.toolbar}>
                {actions.map(({ label, Icon, url }) => (
                    <Link key={label} to={url} className={styles.toolbarAction}>
                        <Icon style={{ fontSize: 24 }} />
                        <span>{label}</span>
                    </Link>
                ))}
            </div>
        </Layout.Header>
    );
};

export default Header;
