import faker from "faker";

import { browser } from "shared/lib";
import type { User } from "../../types";
import { USERS_UBOOKS } from "./user-books";
import * as roles from "./roles";

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
        favABooks: [],
        roles: [roles.USER],
        statusBan: false,
        registeredAt: "2021-04-15T00:00:00.354Z",
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
    favABooks: [],
    roles: [roles.USER],
    statusBan: false,
    registeredAt: "2021-05-20T00:00:00.354Z",
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
    favABooks: [],
    roles: [roles.USER],
    statusBan: false,
    registeredAt: "2021-05-16T00:00:00.354Z",
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
    favABooks: [],
    roles: [roles.USER],
    statusBan: false,
    registeredAt: "2021-05-12T00:00:00.354Z",
};

const __VIEWER: User = {
    id: 4,
    email: "jack.doe@gmail.com",
    emailVerified: false,
    firstName: "Jack",
    lastName: "Doe",
    books: USERS_UBOOKS[4],
    // FIXME: hardcoded
    closedOrders: [4],
    // FIXME: hardcoded
    openedOrders: [1, 2, 3],
    // FIXME: hardcoded
    reservations: [2, 7],
    // FIXME: hardcoded
    favABooks: [25],
    roles: [roles.USER],
    statusBan: false,
    registeredAt: "2021-05-02T00:00:00.354Z",
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

const LIST = [
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

const usersLS = browser.initLSItem("api/users", LIST);

export const getAll = () => usersLS.value;

export const getById = (userId: number) => {
    return getAll().find((u) => u.id === userId);
};

// FIXME Для синхронизации
export const getViewer = () => {
    return getById(__VIEWER.id)!;
};

export const __updateUser = (user: User) => {
    const prevList = getAll();
    const userIdx = prevList.findIndex((u) => u.id === user.id);
    const nextList = [...prevList];
    nextList[userIdx] = user;

    LIST[userIdx] = user;
    usersLS.setValue(nextList);
};

export const getByIds = (userIds: number[]) => {
    return userIds.map((id) => getById(id)!);
};
