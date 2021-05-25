import dayjs from "dayjs";
import type { Order } from "../types";

// FIXME: hardcoded! dry!
const VIEWER_ID = 4;

let __size = 0;

export const createOrder = (params: {
    id?: number;
    bookId: number;
    userId: number;
    costs: number;
    deliveredDelta?: number;
    startDelta?: number;
    endDelta?: number;
    status: Order["status"];
}) => {
    return {
        id: params.id || ++__size,
        bookId: params.bookId,
        costs: params.costs / 1.25,
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
    bookId: 45,
    costs: 400,
    deliveredDelta: 3,
    startDelta: -1,
    endDelta: 12,
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
});

export const VI_ORDER_2: Order = createOrder({
    bookId: 38,
    costs: 100,
    deliveredDelta: 2,
    startDelta: 0,
    endDelta: 6,
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
});

export const VI_ORDER_3: Order = createOrder({
    bookId: 9,
    costs: 200,
    deliveredDelta: -2,
    startDelta: -3,
    endDelta: 4,
    status: "RENTED",
    userId: VIEWER_ID,
});

export const VI_ORDER_4: Order = createOrder({
    bookId: 31,
    costs: 100,
    deliveredDelta: -14,
    startDelta: -16,
    endDelta: -9,
    status: "CLOSED",
    userId: VIEWER_ID,
});

export const YA_ORDER_1: Order = createOrder({
    bookId: 13,
    costs: 100,
    status: "CLOSED",
    userId: 2,
});

export const YA_ORDER_2: Order = createOrder({
    bookId: 13,
    costs: 400,
    status: "RENTED",
    userId: 3,
});

export const YA_ORDER_3: Order = createOrder({
    bookId: 14,
    costs: 150,
    status: "CLOSED",
    userId: 1,
});

export const YA_ORDER_4: Order = createOrder({
    bookId: 16,
    costs: 300,
    status: "CLOSED",
    userId: 5,
});

const LIST = [
    VI_ORDER_1,
    VI_ORDER_2,
    VI_ORDER_3,
    VI_ORDER_4,
    YA_ORDER_1,
    YA_ORDER_2,
    YA_ORDER_3,
    YA_ORDER_4,
];

export const getAll = () => LIST;

export const pushTo = (...orders: Order[]) => LIST.push(...orders);

export const getById = (orderId: number) => LIST.find((o) => o.id === orderId);

export const getByUserId = (userId: number) => LIST.filter((o) => o.userId === userId);
export const getByIds = (orderIds: number[]) => {
    // console.log("LIST", LIST);
    return orderIds.map((id) => getById(id)!);
};

export const getByBookId = (bookId: number) => LIST.filter((o) => o.bookId === bookId);
