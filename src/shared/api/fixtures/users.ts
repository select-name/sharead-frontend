import faker from "faker";
import type { User, Book } from "../types";
import * as roles from "./roles";
import * as books from "./books";

export const userBooksMap: Record<number, number[]> = {
    0: [],
    1: [15, 1, 17],
    2: [12, 10, 3, 11, 18],
    3: [3, 8, 31, 2],
    4: [25, 16, 4, 22, 28, 24, 32],
    5: [2, 6, 7],
    6: [1, 2, 30, 4, 5],
    7: [6, 7, 8, 9, 10],
    8: [11, 12, 13, 14, 15],
    9: [16, 17, 18, 19, 20],
    10: [21, 22, 23, 24, 25],
    11: [26, 27, 28, 29, 30],
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
        books: books.getByIds(userBooksMap[userId]),
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
    books: books.getByIds(userBooksMap[1]),
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
    books: books.getByIds(userBooksMap[2]),
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
    books: books.getByIds(userBooksMap[3]),
    closedOrders: [],
    openedOrders: [],
    reservations: [],
    roles: [roles.USER],
    statusBan: false,
};

export const BRAD_DOE: User = {
    id: 4,
    email: "brad.doe@gmail.com",
    emailVerified: false,
    firstName: "Brad",
    lastName: "Doe",
    books: books.getByIds(userBooksMap[4]),
    closedOrders: [],
    // FIXME: hardcoded
    openedOrders: [1, 2, 3],
    reservations: books.getByIds([26]),
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

export const __VIEWER = BRAD_DOE;

export const getAll = () => [
    SIMPLE_USER,
    JOHN_DOE,
    JULY_DOE,
    JANE_DOE,
    BRAD_DOE,
    OWNER_5,
    OWNER_6,
    OWNER_7,
    OWNER_8,
    OWNER_9,
    OWNER_10,
    OWNER_11,
];

export const getAllWithBook = (bookId: number) => {
    return getAll().filter((u) => u.books.some((b) => b.id === bookId));
};

// === booksUnits
//
// FIXME: @hardcoded @temp @lowCoupling
let size = 0;
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

// FIXME: @hardcoded @temp @lowCoupling
const createBookUnits = (abstractBookId: number): Book[] => {
    const abstract = books.getBookById(abstractBookId);
    if (!abstract) return [];

    const price = books.getPseudoPrice(abstract);

    const owners = getAllWithBook(abstractBookId);

    return owners.map((owner, idx) => ({
        id: ++size,
        abstractBook: abstract,
        // !!! FIXME: temp
        costPerDay: price,
        owner,
        availableBefore: dates[idx % dates.length],
    }));
};

// FIXME: @hardcoded
export const booksUnits = new Array(books.getAll().length + 1)
    .fill(0)
    .map((_, idx) => createBookUnits(idx));
