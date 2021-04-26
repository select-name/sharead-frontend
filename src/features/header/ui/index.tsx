import cn from "classnames";
import { Layout } from "antd";
import { ReactComponent as Logo } from "./logo.svg";
import Search from "./search";
import styles from "./styles.module.scss";

type Props = {
    // stickable?: boolean;
    className?: string;
    theme?: "normal" | "transparent";
};

const Header = (props: Props) => {
    const { theme = "normal", className } = props;

    return (
        <Layout.Header className={cn(styles.root, styles[`root--${theme}`], className)}>
            <div className={styles.logo}>
                <Logo width={24} />
                <h1 className={styles.logoTitle}>sharead</h1>
            </div>
            <div>
                <Search />
            </div>
        </Layout.Header>
    );
};

export default Header;
