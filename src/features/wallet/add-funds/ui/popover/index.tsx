import { Popover, Button } from "antd";

import AddFundsForm from "../form";
import styles from "./styles.module.scss";

const AddFundsPopover = () => {
    return (
        <Popover content={<AddFundsForm className={styles.form} />} visible>
            <Button shape="round" type="dashed">
                300 ₽
            </Button>
        </Popover>
    );
};

export default AddFundsPopover;
