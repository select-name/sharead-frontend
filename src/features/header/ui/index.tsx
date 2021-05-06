import cn from "classnames";
import { Layout, Badge, Alert } from "antd";
import {
    HeartOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    FolderOpenOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
// !!! FIXME:
import { Wallet } from "features/wallet";

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
        label: "Каталог",
        Icon: MenuOutlined,
        url: "/catalog",
        showBadge: false,
        disabled: false,
    },
    {
        label: "Заказы",
        Icon: FolderOpenOutlined,
        url: "#orders",
        showBadge: false,
        disabled: true,
    },
    {
        label: "Избранное",
        Icon: HeartOutlined,
        url: "#fav",
        showBadge: false,
        disabled: true,
    },
    {
        label: "Корзина",
        Icon: ShoppingCartOutlined,
        url: "/order",
        showBadge: true,
        disabled: false,
    },
    {
        label: "Профиль",
        Icon: UserOutlined,
        url: "/profile",
        showBadge: true,
        disabled: false,
    },
];

const LocationAlert = () => (
    <Alert
        className={styles.locationAlert}
        message="На данный момент, сервис доступен только в Казани"
        type="info"
        closeText="Закрыть"
    />
);

// const NOT_AVAILABLE = "Пока что данный функционал не доступен";

const Header = (props: Props) => {
    const { className } = props;

    return (
        <>
            <LocationAlert />
            <Layout.Header className={cn(styles.root, className)}>
                <Link className={styles.logo} to="/">
                    <Logo width={24} />
                    <h1 className={styles.logoTitle}>sharead</h1>
                </Link>
                <div className={styles.search}>
                    <Search />
                </div>
                <div className={styles.toolbar}>
                    <Wallet.AddFunds.Popover />
                    {/* TODO: add amount-label later */}
                    {actions.map(({ label, Icon, url, showBadge, disabled }) => (
                        <Link
                            key={label}
                            to={url}
                            className={cn(styles.toolbarAction, {
                                [styles.toolbarActionDisabled]: disabled,
                            })}
                            // title={disabled ? NOT_AVAILABLE : ""}
                        >
                            {/* Для выравнивания бейджа */}
                            <span className={styles.toolbarActionIcon}>
                                <Badge dot={showBadge} style={{ backgroundColor: "#108ee9" }}>
                                    <Icon style={{ fontSize: 24 }} />
                                </Badge>
                            </span>
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </Layout.Header>
        </>
    );
};

export default Header;
