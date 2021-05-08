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
    span?: number;
};

const TileView = (props: TileProps) => {
    const { label, value, className, span } = props;

    return (
        <Col span={span} className={cn(styles.root, className)}>
            <span>
                {label}
                <br />
                <b>{value}</b>
            </span>
        </Col>
    );
};

export default TileView;
