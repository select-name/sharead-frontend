import { Popover, Button } from "antd";

import { useViewerWallet } from "entities/viewer";
import AddFundsForm from "../form";
import styles from "./styles.module.scss";

type Props = {
    className?: string;
};

const AddFundsPopover = ({ className }: Props) => {
    const viewer = useViewerWallet();

    return (
        <Popover
            trigger="click"
            className={className}
            content={<AddFundsForm className={styles.form} />}
        >
            <Button shape="round" type="dashed">
                {viewer.wallet} ₽
            </Button>
        </Popover>
    );
};

export default AddFundsPopover;
