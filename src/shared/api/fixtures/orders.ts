import dayjs from "dayjs";
import type { Order } from "../types";

// FIXME: hardcoded!

const VIEWER_ID = 4;

// 25 19 3
export const VI_ORDER_1: Order = {
    id: 1,
    bookId: 25,
    costs: 400,
    deliveredAt: dayjs().add(3, "days").toISOString(),
    startAt: dayjs().subtract(1, "days").toISOString(),
    endAt: dayjs().add(12, "days").toISOString(),
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
};

export const VI_ORDER_2: Order = {
    id: 2,
    bookId: 19,
    costs: 100,
    deliveredAt: dayjs().add(2, "days").toISOString(),
    startAt: dayjs().toISOString(),
    endAt: dayjs().add(6, "days").toISOString(),
    status: "WAITING_TRANSFER",
    userId: VIEWER_ID,
};

export const VI_ORDER_3: Order = {
    id: 3,
    bookId: 3,
    costs: 100,
    deliveredAt: dayjs().subtract(2, "days").toISOString(),
    startAt: dayjs().subtract(3, "days").toISOString(),
    endAt: dayjs().add(4, "days").toISOString(),
    status: "RENTED",
    userId: VIEWER_ID,
};

export const getAll = () => [VI_ORDER_1, VI_ORDER_2, VI_ORDER_3];
export const getByIds = (orderIds: number[]) => getAll().filter((o) => orderIds.includes(o.id));
