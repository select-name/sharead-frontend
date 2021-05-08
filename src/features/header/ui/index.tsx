import cn from "classnames";
import { Layout, Badge, Alert } from "antd";
import {
    HeartOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    // FolderOpenOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

// !!! FIXME:
import { Wallet } from "features/wallet";
import { orderModel } from "entities/order";
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
        id: "catalog" as const,
        label: "Каталог",
        Icon: MenuOutlined,
        url: "/catalog",
        disabled: false,
    },
    // {
    //     label: "Заказы",
    //     Icon: FolderOpenOutlined,
    //     url: "#orders",
    //     disabled: true,
    // },
    {
        id: "fav" as const,
        label: "Избранное",
        Icon: HeartOutlined,
        url: "#fav",
        disabled: true,
    },
    {
        id: "cart" as const,
        label: "Корзина",
        Icon: ShoppingCartOutlined,
        url: "/order",
        disabled: false,
    },
    {
        id: "profile" as const,
        label: "Профиль",
        Icon: UserOutlined,
        url: "/profile",
        disabled: false,
    },
];

type ActionId = typeof actions[number]["id"];

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
    const orderTotal = orderModel.useOrderBooks().length;

    const count: Record<ActionId, number> = {
        cart: orderTotal,
        catalog: 0,
        fav: 0,
        profile: 0,
    };

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
                    <Wallet.AddFunds.Popover className={styles.toolbarWallet} />
                    {/* TODO: add amount-label later */}
                    {actions.map(({ id, label, Icon, url, disabled }) => (
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
                                <Badge count={count[id]} style={{ backgroundColor: "#108ee9" }}>
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
