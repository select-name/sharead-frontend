import { Button, Modal } from "antd";
import { ShoppingOutlined, ShoppingFilled } from "@ant-design/icons";

import { orderModel } from "entities/order";

type Props = {
    bookId: number;
};

export const AddBook = ({ bookId }: Props) => {
    const { isBookInCart } = orderModel.books.useBookStatus(bookId);

    return (
        <Button
            type={isBookInCart ? "dashed" : "primary"}
            icon={<ShoppingOutlined />}
            onClick={() => orderModel.books.toggleBook(bookId)}
            block
        >
            {isBookInCart ? "Убрать из корзины" : "В корзину"}
        </Button>
    );
};

export const AddBookMini = ({ bookId }: Props) => {
    const { isBookInCart } = orderModel.books.useBookStatus(bookId);

    const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined;
    return <Icon style={{ fontSize: 20 }} onClick={() => orderModel.books.toggleBook(bookId)} />;
};

export const DeleteBook = ({ bookId }: Props) => {
    return (
        <Button
            type="ghost"
            danger
            icon={<ShoppingFilled />}
            onClick={() =>
                Modal.confirm({
                    title: "Вы точно хотите удалить книгу из корзины?",
                    icon: <ShoppingFilled />,
                    content: "Действие нельзя будет отменить",
                    okText: "Да",
                    cancelText: "Нет",
                    okType: "danger",
                    onOk() {
                        orderModel.books.toggleBook(bookId);
                    },
                })
            }
            block
        >
            Удалить
        </Button>
    );
};
