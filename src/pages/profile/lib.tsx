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
        value: `${viewer.closedOrders
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

export const ownStatuses: Record<number, ReactNode> = {
    0: <Typography.Text type="success">Арендуется</Typography.Text>,
    1: <Typography.Text style={{ color: "#108ee9" }}>Свободна</Typography.Text>,
};

export const rentedStatuses: Record<number, ReactNode> = {
    0: <Typography.Text type="warning">Ожидает передачи</Typography.Text>,
    1: <Typography.Text type="success">На руках</Typography.Text>,
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
