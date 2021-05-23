import faker from "faker";
import type { User } from "../types";
import * as roles from "./roles";
import * as books from "./books";
import * as orders from "./orders";

export const userBooksMap: Record<number, number[]> = {
    0: [],
    1: [15, 1, 17],
    2: [12, 10, 3, 11, 18],
    3: [3, 8, 31, 2],
    4: [25, 16, 4, 22, 28, 24, 32],
    5: [2, 6, 7],
    6: [1, 2, 3, 4, 5],
    7: [6, 7, 8, 9, 10],
    8: [11, 12, 13, 14, 15],
    9: [16, 17, 18, 19, 20],
    10: [21, 22, 23, 24, 25],
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
    openedOrders: orders.getOrderBooks(),
    reservations: [books.BRAVE_NEW_WORLD_2017],
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
export const OWNER_0 = createUser(9);
export const OWNER_10 = createUser(10);

export const __VIEWER = BRAD_DOE;

export const getAll = () => [JOHN_DOE, JULY_DOE, JANE_DOE, BRAD_DOE];
