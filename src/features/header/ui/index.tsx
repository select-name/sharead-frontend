import { useState, useEffect } from "react";
import cn from "classnames";
import { Layout } from "antd";
import { ReactComponent as Logo } from "./logo.svg";
import styles from "./styles.module.scss";

// FIXME: Улучшить реализацию
const STICKY_LIMIT = 1080 - 170; // Screen - Header - Magic Offse ;D

// FIXME: Улучшить реализацию (ref/event?)
const useSticky = () => {
    const [isSticky, setSticky] = useState(true);
    const handleScroll = () => {
        setSticky(window.scrollY >= STICKY_LIMIT);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", () => handleScroll);
        };
    }, []);

    return { isSticky };
};

type Props = {
    stickable?: boolean;
    className?: string;
    theme?: "normal" | "transparent";
};

const Header = (props: Props) => {
    const { stickable = false, theme = "normal", className } = props;
    const { isSticky } = useSticky();

    return (
        <Layout.Header
            className={cn(
                styles.root,
                styles[`root--${theme}`],
                { [styles.rootSticky]: stickable && isSticky },
                className,
            )}
        >
            <div className={styles.logo}>
                <Logo width={24} />
                <h1 className={styles.logoTitle}>sharead</h1>
            </div>
            <nav className={styles.nav}>
                <a className={styles.navItem} href="#benefits">
                    Польза
                </a>
                <a className={styles.navItem} href="#features">
                    Возможности
                </a>
                <a className={styles.navItem} href="#social">
                    Поиск единомышленников
                </a>
            </nav>
        </Layout.Header>
    );
};

export default Header;
