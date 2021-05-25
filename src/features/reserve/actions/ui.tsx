import { Button } from "antd";
import { ClockCircleOutlined, ClockCircleFilled } from "@ant-design/icons";

import { orderModel } from "entities/order";
import { bookModel } from "entities/book";
import { alert } from "shared/lib";

type Props = {
    bookId: number;
};

const useToggleBook = (bookId: number) => {
    // FIXME: replace to reservationModel
    const { isBookReserved } = orderModel.reservation.useBookReservationStatus(bookId);
    // const isBookReserved = Boolean((book?.name.length || 0) % 2);
    const book = bookModel.useBook(bookId);

    const handleToggle = () => {
        const action = isBookReserved
            ? "Вы удалены из очереди на книгу"
            : "Вы добавлены в очередь на книгу";
        alert.info(
            `${book?.name}`,
            <a href="/profile#reserved">{action}</a>,
            <ClockCircleOutlined />,
        );
        orderModel.reservation.events.toggleBook(bookId);
    };

    return { handleToggle, isBookReserved };
};

export const ReserveBook = ({ bookId }: Props) => {
    const { handleToggle, isBookReserved } = useToggleBook(bookId);

    const Icon = isBookReserved ? ClockCircleFilled : ClockCircleOutlined;
    return (
        <Button block icon={<Icon />} onClick={handleToggle} type="dashed">
            {isBookReserved ? "Убрать из брони" : "Забронировать"}
        </Button>
    );
};

export const ReserveBookMini = ({ bookId }: Props) => {
    const { handleToggle, isBookReserved } = useToggleBook(bookId);

    const Icon = isBookReserved ? ClockCircleFilled : ClockCircleOutlined;
    return <Icon style={{ fontSize: 20 }} onClick={handleToggle} />;
};
