import { Button, Modal } from "antd";
import { ShoppingOutlined, ShoppingFilled } from "@ant-design/icons";

import { orderModel } from "entities/order";
import { bookModel } from "entities/book";
import { alert } from "shared/lib";

type Props = {
    bookId: number;
};

const useToggleBook = (bookId: number) => {
    const { isBookInCart } = orderModel.books.useBookStatus(bookId);
    const book = bookModel.useBook(bookId);

    const handleToggle = () => {
        const action = isBookInCart ? "Удалено из заказа" : "Добавлено в заказ";
        alert.info(`${book?.name}`, action, <ShoppingOutlined />);
        orderModel.events.toggleBook(bookId);
    };

    return { handleToggle, isBookInCart };
};
export const AddBook = ({ bookId }: Props) => {
    const { handleToggle, isBookInCart } = useToggleBook(bookId);

    const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined;
    return (
        <Button type="primary" icon={<Icon />} onClick={handleToggle} block>
            {isBookInCart ? "Убрать из заказа" : "В заказ"}
        </Button>
    );
};

export const AddBookMini = ({ bookId }: Props) => {
    const { handleToggle, isBookInCart } = useToggleBook(bookId);

    const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined;
    return <Icon style={{ fontSize: 20 }} onClick={handleToggle} />;
};

export const DeleteBook = ({ bookId }: Props) => {
    const { handleToggle } = useToggleBook(bookId);

    return (
        <Button
            type="ghost"
            danger
            icon={<ShoppingFilled />}
            onClick={() =>
                Modal.confirm({
                    title: "Вы точно хотите удалить книгу из заказа?",
                    icon: <ShoppingFilled />,
                    content: "Действие нельзя будет отменить",
                    okText: "Да",
                    cancelText: "Нет",
                    okType: "danger",
                    onOk() {
                        handleToggle();
                    },
                })
            }
            block
        >
            Удалить
        </Button>
    );
};
