import { Skeleton } from "antd";
import cn from "classnames";
import styles from "./styles.module.scss";

type Props = {
    className?: string;
    height?: number;
};

/**
 * @UIKit Плейсхолдер-скелетон для карточки
 * @loading
 */
const SkeletonView = ({ className, height = 145 }: Props) => {
    return (
        <Skeleton.Input
            className={cn(styles.root, className)}
            size="large"
            active
            style={{ height }}
        />
    );
};

export default SkeletonView;
