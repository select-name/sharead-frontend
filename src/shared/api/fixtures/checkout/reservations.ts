import dayjs from "dayjs";
import type { Reservation } from "shared/api";

// FIXME: hardcoded! dry!
const VIEWER_ID = 4;

let __size = 0;

// const INITIAL_DATE = "2021-06-01T00:00:00.354Z";

const createReservation = (params: {
    aBookId: number;
    userId: number;
    status?: Reservation["status"];
}): Reservation => {
    const id = ++__size;
    return {
        id,
        aBookId: params.aBookId,
        userId: params.userId,
        reservedAt: dayjs()
            .add(id + 7, "days")
            .toISOString(),
        status: params.status || "PENDING",
    };
};

// FIXME: Пофиксить, чтобы брались потом
// Только последние резервации для пользователя

export const YA_RES_0 = createReservation({
    aBookId: 23,
    userId: 10,
    status: "REJECTED",
});

export const VI_RES = createReservation({
    aBookId: 23,
    userId: VIEWER_ID,
});

export const YA_RES_1 = createReservation({
    aBookId: 23,
    userId: 1,
});

export const YA_RES_2 = createReservation({
    aBookId: 23,
    userId: 8,
});

export const YA_RES_3 = createReservation({
    aBookId: 2,
    userId: 1,
});

export const YA_RES_4 = createReservation({
    aBookId: 2,
    userId: 3,
});

export const YA_RES_5 = createReservation({
    aBookId: 2,
    userId: VIEWER_ID,
});

export const YA_RES_6 = createReservation({
    aBookId: 1,
    userId: 9,
});

// prettier-ignore
export const getAll = () => [
    YA_RES_0,
    VI_RES,
    YA_RES_1,
    YA_RES_2,
    YA_RES_3,
    YA_RES_4,
    YA_RES_5,
    YA_RES_6,
];

export const getAllSorted = () => getAll().sort((a, b) => a.id - b.id);

export const getByABook = (aBookId: number) => getAllSorted().filter((r) => r.aBookId === aBookId);

export const getUserIdx = (userId: number, aBookId: number) => {
    return getByABook(aBookId)
        .filter((r) => r.status === "PENDING")
        .findIndex((r) => r.userId === userId);
};

export const getById = (resId: number) => getAll().find((o) => o.id === resId);

export const getByIds = (resIds: number[]) => resIds.map((id) => getById(id)!);
