import dayjs from "dayjs";
import pluralize from "plural-ru";
import { AbstractBook, fakeApi, Reservation } from "shared/api";
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
    const bookOrders = fakeApi.checkout.orders.getByBookId(book.id);
    const bookOrdersStatuses = bookOrders.map((bo) => bo.status);

    const isSomeRented = bookOrdersStatuses.includes("RENTED");
    const isSomeWaitingTransfer = bookOrdersStatuses.includes("WAITING_TRANSFER");
    const status = isSomeRented || isSomeWaitingTransfer ? ("BUSY" as const) : ("FREE" as const);
    return { status };
};

// Страх и ужас, не показывайте такое детям
export const getUserNormalized = (user: User) => {
    const opened: Order[] = fakeApi.checkout.orders.getByIds(user.openedOrders);

    const openedBooks: Book[] = fakeApi.users.userBooks.getUserBooksByIds(
        opened.map((o) => o.bookId),
    );

    const closed: Order[] = fakeApi.checkout.orders.getByIds(user.closedOrders);
    const closedBooks: Book[] = fakeApi.users.userBooks.getUserBooksByIds(
        closed.map((o) => o.bookId),
    );
    const closedPrices: number[] = closedBooks.map((cb) =>
        fakeApi.library.books.getPrice(cb.abstractBook),
    );

    const reserved: Reservation[] = fakeApi.checkout.reservations.getByIds(user.reservations);
    const reservedBooks: AbstractBook[] = fakeApi.library.books.getByIds(
        reserved.map((o) => o.aBookId),
    );

    return {
        opened,
        openedBooks,
        closed,
        closedBooks,
        closedPrices,
        reserved,
        reservedBooks,
    };
};

export const getUserStat = (user: User) => {
    const un = getUserNormalized(user);

    // Если учитывать, что цена на книгу уменьшается в среднем в 4 раза по сравнению с оригиналом
    const saved = un.closedPrices.reduce((a, b) => a + b, 0) * (4 - 1);

    return {
        saved: `~ ${saved} ₽`,
        registered: dayjs(user.registeredAt).format("D MMM YYYY"),
    };
};

export const getReservationInfo = (reservation: Reservation) => {
    const queryIdx = fakeApi.checkout.reservations.getUserIdx(
        reservation.userId,
        reservation.aBookId,
    );
    const awaitTime = queryIdx * 7;
    const couldBeRent = queryIdx === 0;

    return { queryIdx, awaitTime, couldBeRent };
};
