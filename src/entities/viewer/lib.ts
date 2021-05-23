import dayjs from "dayjs";
import pluralize from "plural-ru";
import { fakeApi } from "shared/api";
import type { Book, Order, User } from "shared/api";

// Да здравствует свалка хелперов!

// FIXME: @temp
export const getDaysLabel = (days: number) => pluralize(days, "%d день", "%d дня", "%d дней");
export const getOrdersLabel = (amount: number) =>
    pluralize(amount, "%d сделка", "%d сделки", "%d сделок");

export const getOrderInfo = (order: Order) => {
    const { status, deliveredAt, endAt } = order;

    if (status === "WAITING_TRANSFER") {
        const diff = dayjs(deliveredAt).diff(dayjs(), "days");
        return `Будет доставлено через ${getDaysLabel(diff)}`;
    }
    if (status === "RENTED") {
        const diff = dayjs(endAt).diff(dayjs(), "days");
        return `Осталось: ${getDaysLabel(diff)}`;
    }

    return "";
};

export const getMyBookInfo = (book: Book) => {
    const bookOrders = fakeApi.orders.getByBookId(book.id);
    const bookOrdersStatuses = bookOrders.map((bo) => bo.status);

    const earned = bookOrders.map((bo) => bo.costs).reduce((a, b) => a + b, 0);
    const isSomeRented = bookOrdersStatuses.includes("RENTED");
    const isSomeWaitingTransfer = bookOrdersStatuses.includes("WAITING_TRANSFER");
    const status = isSomeRented || isSomeWaitingTransfer ? ("BUSY" as const) : ("FREE" as const);
    return { earned, status };
};

// Страх и ужас, не показывайте такое детям
export const getUserNormalized = (user: User) => {
    const ownBooks = fakeApi.users.getUserBooksByIds(user.books);
    const own = ownBooks.map((ob) => fakeApi.orders.getByBookId(ob.id)).flat();

    const opened = fakeApi.orders.getByIds(user.openedOrders);
    const openedBooks = fakeApi.users.getUserBooksByIds(opened.map((o) => o.bookId));
    const closed = fakeApi.orders.getByIds(user.closedOrders);
    const closedBooks = fakeApi.users.getUserBooksByIds(closed.map((o) => o.bookId));
    const closedPrices = closedBooks.map((cb) => fakeApi.books.getPseudoPrice(cb.abstractBook));

    return {
        own,
        ownBooks,
        opened,
        openedBooks,
        closed,
        closedBooks,
        closedPrices,
    };
};

export const getUserStat = (user: User) => {
    const un = getUserNormalized(user);

    // Если учитывать, что цена на книгу уменьшается в среднем в 6 раз по сравнению с оригиналом
    const saved = un.closedPrices.reduce((a, b) => a + b, 0) * (6 - 1);
    const earned = un.ownBooks
        .map(getMyBookInfo)
        .map((st) => st.earned)
        .reduce((a, b) => a + b, 0);

    const closed = un.closed.length + un.opened.length + un.own.length;

    return {
        saved: `${saved} ₽`,
        earned: `${earned} ₽`,
        registered: "2 мая 2021",
        closed: getOrdersLabel(closed),
    };
};
