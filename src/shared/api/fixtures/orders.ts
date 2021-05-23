import dayjs from "dayjs";
import type { Order } from "../types";

// FIXME: hardcoded!

const VIEWER_ID = 4;

const createOrder = (params: {
    id: number;
    bookId: number;
    userId: number;
    costs: number;
    deliveredDelta: number;
    startDelta: number;
    endDelta: number;
    status: Order["status"];
}) => ({
    id: params.id,
    bookId: params.bookId,
    costs: params.costs,
    deliveredAt: dayjs().add(params.deliveredDelta, "days").toISOString(),
    startAt: dayjs().add(params.startDelta, "days").toISOString(),
    endAt: dayjs().add(params.endDelta, "days").toISOString(),
    status: params.status,
    userId: params.userId,
});

export const VI_ORDER_1: Order = createOrder({
    id: 1,
    bookId: 25,
    costs: 400,
    deliveredDelta: 3,
    startDelta: -1,
    endDelta: 12,
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
});

export const VI_ORDER_2: Order = createOrder({
    id: 2,
    bookId: 19,
    costs: 100,
    deliveredDelta: 2,
    startDelta: 0,
    endDelta: 6,
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
});

export const VI_ORDER_3: Order = createOrder({
    id: 3,
    bookId: 3,
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

export const getAll = () => [VI_ORDER_1, VI_ORDER_2, VI_ORDER_3, VI_ORDER_4];
export const getByUserId = (userId: number) => getAll().filter((o) => o.userId === userId);
export const getByIds = (orderIds: number[]) => getAll().filter((o) => orderIds.includes(o.id));
