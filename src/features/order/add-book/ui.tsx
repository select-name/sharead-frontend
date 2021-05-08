import { Button } from "antd";
import { ShoppingOutlined, ShoppingFilled } from "@ant-design/icons";

import { orderModel } from "entities/order";

type Props = {
    bookId: number;
};

export const AddBook = ({ bookId }: Props) => {
    const { isBookInCart } = orderModel.useBookStatus(bookId);

    return (
        <Button
            type={isBookInCart ? "dashed" : "primary"}
            icon={<ShoppingOutlined />}
            onClick={() => orderModel.toggleBook(bookId)}
            block
        >
            {isBookInCart ? "Убрать из корзины" : "В корзину"}
        </Button>
    );
};

export const AddBookMini = ({ bookId }: Props) => {
    const { isBookInCart } = orderModel.useBookStatus(bookId);

    const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined;
    return <Icon style={{ fontSize: 20 }} onClick={() => orderModel.toggleBook(bookId)} />;
};
