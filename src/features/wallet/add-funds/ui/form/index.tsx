import { Input, Typography, Button } from "antd";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    className?: string;
};

const AddFundsForm = ({ className }: Props) => {
    return (
        <div className={cn(styles.root, className)}>
            <Typography.Title level={4}>Пополнение кошелька</Typography.Title>
            <Input addonAfter="₽" min={100} type="number" />
            <Typography.Text type="secondary" className={styles.remark}>
                Оплата будет проходить на внешнем сервисе по стандартам безопасности PCI DSS
            </Typography.Text>
            <Button type="primary" block href="#redirect-to-payment-service">
                Пополнить
            </Button>
        </div>
    );
};

export default AddFundsForm;
