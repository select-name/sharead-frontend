import { PropsWithChildren } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

type Props = PropsWithChildren<{
    rootClassName?: string;
    className?: string;
    theme?: "normal" | "alt";
}>;

const HomeSection = (props: Props) => {
    const { children, rootClassName, className, theme = "normal" } = props;
    return (
        <section className={cn(styles.root, { [styles.rootAlt]: theme === "alt" }, rootClassName)}>
            <div className={cn(styles.content, className)}>{children}</div>
        </section>
    );
};

export default HomeSection;
