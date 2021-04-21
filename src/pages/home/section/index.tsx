import { PropsWithChildren } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

type Props = PropsWithChildren<{
    id?: string;
    className?: string;
    innerClassName?: string;
    theme?: "normal" | "alt";
}>;

const HomeSection = (props: Props) => {
    const { id, children, className, innerClassName, theme = "normal" } = props;
    return (
        <section
            id={id}
            className={cn(styles.root, { [styles.rootAlt]: theme === "alt" }, className)}
        >
            <div className={cn(styles.content, innerClassName)}>{children}</div>
        </section>
    );
};

export default HomeSection;
