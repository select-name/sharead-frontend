import dayjs from "dayjs";
import type { Order } from "../types";

// FIXME: hardcoded! dry!
const VIEWER_ID = 4;

const createOrder = (params: {
    id: number;
    bookId: number;
    userId: number;
    costs: number;
    deliveredDelta?: number;
    startDelta?: number;
    endDelta?: number;
    status: Order["status"];
}) => {
    return {
        id: params.id,
        bookId: params.bookId,
        costs: params.costs,
        deliveredAt: dayjs()
            .add(params.deliveredDelta || -2, "days")
            .toISOString(),
        startAt: dayjs()
            .add(params.startDelta || -4, "days")
            .toISOString(),
        endAt: dayjs()
            .add(params.endDelta || 3, "days")
            .toISOString(),
        status: params.status,
        userId: params.userId,
    };
};

export const VI_ORDER_1: Order = createOrder({
    id: 1,
    bookId: 45,
    costs: 400,
    deliveredDelta: 3,
    startDelta: -1,
    endDelta: 12,
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
});

export const VI_ORDER_2: Order = createOrder({
    id: 2,
    bookId: 38,
    costs: 100,
    deliveredDelta: 2,
    startDelta: 0,
    endDelta: 6,
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
});

export const VI_ORDER_3: Order = createOrder({
    id: 3,
    bookId: 9,
    costs: 200,
    deliveredDelta: -2,
    startDelta: -3,
    endDelta: 4,
    status: "RENTED",
    userId: VIEWER_ID,
});

export const VI_ORDER_4: Order = createOrder({
    id: 4,
    bookId: 31,
    costs: 100,
    deliveredDelta: -14,
    startDelta: -16,
    endDelta: -9,
    status: "CLOSED",
    userId: VIEWER_ID,
});

export const YA_ORDER_1: Order = createOrder({
    id: 5,
    bookId: 13,
    costs: 100,
    status: "CLOSED",
    userId: 2,
});

export const YA_ORDER_2: Order = createOrder({
    id: 6,
    bookId: 13,
    costs: 400,
    status: "RENTED",
    userId: 3,
});

export const YA_ORDER_3: Order = createOrder({
    id: 7,
    bookId: 14,
    costs: 150,
    status: "CLOSED",
    userId: 1,
});

export const YA_ORDER_4: Order = createOrder({
    id: 8,
    bookId: 16,
    costs: 300,
    status: "CLOSED",
    userId: 5,
});

export const getAll = () => [
    VI_ORDER_1,
    VI_ORDER_2,
    VI_ORDER_3,
    VI_ORDER_4,
    YA_ORDER_1,
    YA_ORDER_2,
    YA_ORDER_3,
    YA_ORDER_4,
];

export const getById = (orderId: number) => getAll().find((o) => o.id === orderId);

export const getByUserId = (userId: number) => getAll().filter((o) => o.userId === userId);
export const getByIds = (orderIds: number[]) => orderIds.map((id) => getById(id)!);

export const getByBookId = (bookId: number) => getAll().filter((o) => o.bookId === bookId);
