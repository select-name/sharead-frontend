import cn from "classnames";
import { Layout, Badge, Alert } from "antd";
import {
    HeartOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    FolderOpenOutlined,
    MenuOutlined,
} from "@ant-design/icons";
// https://stackoverflow.com/questions/48223566/using-anchor-tags-in-react-router-4
import { HashLink } from "react-router-hash-link";

// !!! FIXME:
import { Wallet } from "features/wallet";
import { viewerModel } from "entities/viewer";
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
    {
        id: "orders" as const,
        label: "Заказы",
        Icon: FolderOpenOutlined,
        url: "/profile#opened",
        disabled: false,
    },
    {
        id: "fav" as const,
        label: "Избранное",
        Icon: HeartOutlined,
        url: "/profile#fav",
        disabled: false,
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

// eslint-disable-next-line max-lines-per-function
const Header = (props: Props) => {
    const { className } = props;
    const orderTotal = orderModel.cart.useOrderBooks().length;
    const favTotal = viewerModel.useFavBooks().length;

    const count: Record<ActionId, number> = {
        cart: orderTotal,
        catalog: 0,
        orders: 0,
        fav: favTotal,
        profile: 0,
    };

    return (
        <>
            <LocationAlert />
            <Layout.Header className={cn(styles.root, className)}>
                <HashLink className={styles.logo} to="/">
                    <Logo width={24} />
                    <h1 className={styles.logoTitle}>sharead</h1>
                </HashLink>
                <div className={styles.search}>
                    <Search />
                </div>
                <div className={styles.toolbar}>
                    <Wallet.AddFunds.Popover className={styles.toolbarWallet} />
                    {/* TODO: add amount-label later */}
                    {actions.map(({ id, label, Icon, url, disabled }) => (
                        <HashLink
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
                        </HashLink>
                    ))}
                </div>
            </Layout.Header>
        </>
    );
};

export default Header;
