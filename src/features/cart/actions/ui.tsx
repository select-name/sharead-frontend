import { Button, Modal } from "antd";
import { ShoppingOutlined, ShoppingFilled } from "@ant-design/icons";

import { orderModel } from "entities/order";
import { bookModel } from "entities/book";
import { alert } from "shared/lib";

type Props = {
    bookId: number;
    disabled?: boolean;
};

const useToggleBook = ({ bookId, disabled }: Props) => {
    const { isBookInCart } = orderModel.cart.useBookStatus(bookId);
    const book = bookModel.useBook(bookId);

    const handleToggle = () => {
        if (disabled) return;
        const action = isBookInCart ? "Удалено из заказа" : "Добавлено в заказ";
        alert.info(`${book?.name}`, action, <ShoppingOutlined />);
        orderModel.cart.events.toggleBook(bookId);
    };

    return { handleToggle, isBookInCart };
};
export const AddBook = (props: Props) => {
    const { handleToggle, isBookInCart } = useToggleBook(props);
    const { disabled } = props;

    const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined;
    return (
        <Button type="primary" icon={<Icon />} onClick={handleToggle} block disabled={disabled}>
            {isBookInCart ? "Убрать из заказа" : "В заказ"}
        </Button>
    );
};

export const AddBookMini = (props: Props) => {
    const { handleToggle, isBookInCart } = useToggleBook(props);
    const { disabled } = props;

    const Icon = isBookInCart ? ShoppingFilled : ShoppingOutlined;
    const disabledStyles: import("react").CSSProperties = disabled
        ? { color: "red", opacity: 0.5, cursor: "not-allowed" }
        : {};

    return (
        <Icon
            style={{ fontSize: 20, ...disabledStyles }}
            onClick={handleToggle}
            disabled={disabled}
        />
    );
};

export const DeleteBook = (props: Props) => {
    const { handleToggle } = useToggleBook(props);
    const { disabled } = props;

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
            disabled={disabled}
        >
            Удалить
        </Button>
    );
};
