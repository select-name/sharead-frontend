import faker from "faker";
import type { User, Book } from "../types";
import * as roles from "./roles";
import * as books from "./books";

export const USER_ABOOKS: Record<number, number[]> = {
    0: [],
    1: [15, 1, 17],
    2: [12, 10, 3, 11, 18],
    3: [3, 8, 31, 2],
    4: [25, 16, 4, 32],
    5: [2, 6, 7],
    6: [1, 2, 30, 4, 5],
    7: [6, 7, 8, 9, 10],
    8: [11, 12, 13, 14, 15],
    9: [16, 17, 18, 19, 20],
    10: [21, 22, 23, 24, 25],
    11: [26, 27, 28, 29, 30],
};

// FIXME: HARDCODED
export const USERS_UBOOKS: Record<number, number[]> = {
    0: [],
    1: [1, 2, 3],
    2: [4, 5, 6, 7, 8],
    3: [9, 10, 11, 12],
    4: [13, 14, 15, 16],
    5: [17, 18, 19],
    6: [20, 21, 22, 23, 24],
    7: [25, 26, 27, 28, 29],
    8: [30, 31, 32, 33, 34],
    9: [35, 36, 37, 38, 39],
    10: [40, 41, 42, 43, 44],
    11: [45, 46, 47, 48, 49],
};

const createUser = (userId: number): User => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
        id: userId,
        email: faker.internet.email(firstName, lastName),
        emailVerified: faker.datatype.boolean(),
        firstName,
        lastName,
        books: USERS_UBOOKS[userId],
        // closedOrders: Array(faker.datatype.number(6))
        closedOrders: [],
        openedOrders: [],
        reservations: [],
        roles: [roles.USER],
        statusBan: false,
    };
};

export const SIMPLE_USER: User = createUser(0);

export const JOHN_DOE: User = {
    id: 1,
    email: "john.doe@gmail.com",
    emailVerified: true,
    firstName: "John",
    lastName: "Doe",
    books: USERS_UBOOKS[1],
    closedOrders: [],
    openedOrders: [],
    reservations: [],
    roles: [roles.USER],
    statusBan: false,
};

export const JULY_DOE: User = {
    id: 2,
    email: "july.doe@gmail.com",
    emailVerified: true,
    firstName: "July",
    lastName: "Doe",
    books: USERS_UBOOKS[2],
    closedOrders: [],
    openedOrders: [],
    reservations: [],
    roles: [roles.USER],
    statusBan: false,
};

export const JANE_DOE: User = {
    id: 3,
    email: "jane.doe@gmail.com",
    emailVerified: false,
    firstName: "Jane",
    lastName: "Doe",
    books: USERS_UBOOKS[3],
    closedOrders: [],
    openedOrders: [],
    reservations: [],
    roles: [roles.USER],
    statusBan: false,
};

export const __VIEWER: User = {
    id: 4,
    email: "vasiliy.oblomov@gmail.com",
    emailVerified: false,
    firstName: "Василий",
    lastName: "Обломов",
    books: USERS_UBOOKS[4],
    closedOrders: [4],
    // FIXME: hardcoded
    openedOrders: [1, 2, 3],
    reservations: books.getByIds([18]),
    roles: [roles.USER],
    statusBan: false,
    wallet: {
        moneyCount: 300,
    },
};

export const OWNER_5 = createUser(5);
export const OWNER_6 = createUser(6);
export const OWNER_7 = createUser(7);
export const OWNER_8 = createUser(8);
export const OWNER_9 = createUser(9);
export const OWNER_10 = createUser(10);

export const OWNER_11 = createUser(11);

export const getAll = () => [
    SIMPLE_USER,
    JOHN_DOE,
    JULY_DOE,
    JANE_DOE,
    __VIEWER,
    OWNER_5,
    OWNER_6,
    OWNER_7,
    OWNER_8,
    OWNER_9,
    OWNER_10,
    OWNER_11,
];

export const getById = (userId: number) => {
    return getAll().find((u) => u.id === userId);
};

export const getByIds = (userIds: number[]) => {
    return userIds.map((id) => getById(id)!);
};

export const getBookOwners = (bookId: number) => {
    const userIds = Object.entries(USER_ABOOKS)
        .filter(([_, aBooksIds]) => aBooksIds.includes(bookId))
        .map(([userId]) => Number(userId));
    return getByIds(userIds);
};

// === userBooks
//
// FIXME: @hardcoded @temp @lowCoupling
// let bookSize = 0;
// const PRICE_OFFSET = 50;
//
// const prices = [
//     price - PRICE_OFFSET * 1.5,
//     price - PRICE_OFFSET,
//     price,
//     price + PRICE_OFFSET,
//     price + PRICE_OFFSET * 1.5,
// ];

// prettier-ignore
const dates = [
    "2021-06-10T00:24:35.354Z",
    "2021-07-17T00:24:35.354Z",
    "2021-08-28T00:24:35.354Z",
];

/**
 * Написанный ниже участок кода может вызвать эпилепсию
 *
 * Будьте аккуратны, я предупредил
 *
 * Была до этого идея - маппить айдишники на основании итеративного прибавления к переменной-счетчику
 * Но поскольку порядок книг в USER_ABOOKS и фактический от 1 до 32 (для AbstractBook) будет различаться
 * Было принято еще одно тяжелое решение - маппится прям по нашим мапам!
 * (не зря же они мапы)
 *
 * Да, таким образом вся функциональнось сосредоточена в них
 *
 * Но лучше решения на данный момент придумать было сложно (тем более - быстро)
 */
export const userBooksMap = Object.entries(USER_ABOOKS).map(([key, abookIds]) => {
    const userId = Number(key);
    const owner = getById(userId);
    if (!owner) throw new Error(`Unknown user with userId=${userId}`);
    const userBooks: Book[] = abookIds.map((aId, idx) => {
        const abstract = books.getById(aId);
        if (!abstract) throw new Error(`Unknown Abstractbook with id=${aId}`);
        const price = books.getPseudoPrice(abstract);

        return {
            id: USERS_UBOOKS[userId][idx],
            abstractBook: abstract,
            // !!! FIXME: temp
            costPerDay: price,
            owner,
            availableBefore: dates[idx % dates.length],
        };
    });
    return userBooks;
});
// // FIXME: @hardcoded @temp @lowCoupling
// const createUserBooks = (abstractBookId: number): Book[] => {
//
//     if (!abstract) return [];

//     const price = books.getPseudoPrice(abstract);

//     const owners = getBookOwners(abstractBookId);

//     return owners.map((owner, idx) => ({

//     }));
// };

// // FIXME: @hardcoded
// export const userBooksMap = new Array(books.getAll().length + 1)
//     .fill(0)
//     .map((_, idx) => createUserBooks(idx));

export const userBooks = userBooksMap.flat();

export const getUserBookById = (userBookId: number) => {
    return userBooks.find((ub) => userBookId === ub.id);
};
export const getUserBooksByIds = (userBookIds: number[]) => {
    return userBookIds.map((id) => getUserBookById(id)!);
};
