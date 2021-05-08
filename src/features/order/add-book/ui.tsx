import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { orderModel } from "entities/order";

type Props = {
    bookId: number;
};

export const AddBook = ({ bookId }: Props) => {
    const { isBookInCart } = orderModel.useBookStatus(bookId);

    return (
        <Button
            type={isBookInCart ? "primary" : "dashed"}
            icon={<ShoppingCartOutlined />}
            onClick={() => orderModel.toggleBook(bookId)}
            block
        >
            {isBookInCart ? "Убрать из корзины" : "В корзину"}
        </Button>
    );
};
