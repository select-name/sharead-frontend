import dayjs from "dayjs";
import type { Reservation } from "shared/api";

// FIXME: hardcoded! dry!
const VIEWER_ID = 4;

let __size = 0;

// const INITIAL_DATE = "2021-06-01T00:00:00.354Z";

const createReservation = (params: { aBookId: number; userId: number }): Reservation => {
    const id = ++__size;
    return {
        id,
        aBookId: params.aBookId,
        userId: params.userId,
        reservedAt: dayjs()
            .add(id + 7, "days")
            .toISOString(),
    };
};

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

// prettier-ignore
export const getAll = () => [
    VI_RES,
    YA_RES_1,
    YA_RES_2,
];

export const getAllSorted = () => getAll().sort((a, b) => a.id - b.id);

export const getBookQuery = (aBookId: number) =>
    getAllSorted().filter((r) => r.aBookId === aBookId);

export const getUserIdx = (userId: number, aBookId: number) => {
    return getBookQuery(aBookId).findIndex((r) => r.userId === userId);
};

export const getById = (resId: number) => getAll().find((o) => o.id === resId);

export const getByIds = (resIds: number[]) => resIds.map((id) => getById(id)!);
