import { Popover, Button } from "antd";
import type { PopoverProps } from "antd";

import { viewerModel } from "entities/viewer";
import AddFundsForm from "../form";
import styles from "./styles.module.scss";

type Props = {
    className?: string;
    placement?: PopoverProps["placement"];
    buttonStyle?: import("react").CSSProperties;
};

const AddFundsPopover = ({ className, placement = "bottom", buttonStyle }: Props) => {
    const viewer = viewerModel.useViewerWallet();

    return (
        <Popover
            trigger="click"
            className={className}
            content={<AddFundsForm className={styles.form} />}
            placement={placement}
        >
            <Button shape="round" type="dashed" style={buttonStyle}>
                {viewer.wallet} ₽
            </Button>
        </Popover>
    );
};

export default AddFundsPopover;
