import { Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import { alert } from "shared/lib";

export const AddBook = () => (
    <Button
        block
        icon={<HeartOutlined />}
        onClick={() => alert.info("[mock] Добавлено в избранное")}
    >
        В избранное
    </Button>
);

export const AddBookMini = () => (
    <HeartOutlined
        style={{ fontSize: 20 }}
        onClick={() => alert.info("[mock] Добавлено в избранное")}
    />
);
