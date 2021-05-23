import { Typography } from "antd";
import type { ReactNode } from "react";
import type { AbstractBook, User } from "shared/api";
import { fakeApi } from "shared/api";

export const getStats = (viewer: User) => [
    { key: "registered", label: "В сервисе с", value: "2 мая 2021" },
    { key: "closed", label: "Закрыто", value: "10 сделок" },
    {
        key: "saved",
        label: "Сэкономлено",
        value: `${fakeApi.orders
            .getByIds(viewer.closedOrders)
            .map((o) => o.bookId)
            .map((id) => fakeApi.books.getByIds([id])[0])
            .map(fakeApi.books.getPseudoPrice)
            // Если учитывать, что цена на книгу уменьшается в среднем в 6 раз по сравнению с оригиналом
            .map((p) => p * (6 - 1))
            .reduce((a, b) => a + b, 0)} ₽`,
    },
    {
        key: "earned",
        label: "Заработано",
        value: `${viewer.books
            .map(getOwnBookPseudoStat)
            .map((it) => it.earned)
            .reduce((a, b) => a + b, 0)} ₽`,
    },
];

export const STATUSES = {
    BUSY: <Typography.Text type="success">Арендуется</Typography.Text>,
    FREE: <Typography.Text style={{ color: "#108ee9" }}>Свободна</Typography.Text>,
    WAITING_TRANSFER: <Typography.Text type="warning">Ожидает передачи</Typography.Text>,
    RENTED: <Typography.Text type="success">На руках</Typography.Text>,
    CLOSED: <Typography.Text type="secondary">Аренда завершена</Typography.Text>,
};
export const ownStatuses: Record<number, ReactNode> = {
    0: STATUSES.BUSY,
    1: STATUSES.FREE,
};

export const rentedStatuses: Record<number, ReactNode> = {
    0: STATUSES.WAITING_TRANSFER,
    1: STATUSES.RENTED,
};

// FIXME: temp!
export const getOwnBookPseudoStat = (book: AbstractBook) => ({
    earned: fakeApi.books.getPseudoPrice(book) * (book.name.length % 4),
    status: ownStatuses[book.name.length % 2],
});

export const getRentedBookStat = (book: AbstractBook) => ({
    status: rentedStatuses[book.name.length % 2],
    statusId: book.name.length % 2,
});
