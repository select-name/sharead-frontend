import type { ReactNode } from "react";
import { Col } from "antd";
import cn from "classnames";

import styles from "./styles.module.scss";

export type TileItem = {
    label: ReactNode;
    value: ReactNode;
};
export type TileProps = TileItem & {
    className?: string;
};

const TileView = (props: TileProps) => {
    const { label, value, className } = props;

    return (
        <Col span={11} className={cn(styles.root, className)}>
            <span>
                {label}
                <br />
                <b>{value}</b>
            </span>
        </Col>
    );
};

export default TileView;
