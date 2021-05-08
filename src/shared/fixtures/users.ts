import type { User } from "entities/types";
import * as roles from "./roles";
import * as books from "./books";
import * as orders from "./orders";

export const JOHN_DOE: User = {
    id: 1,
    email: "john.doe@gmail.com",
    emailVerified: true,
    firstName: "John",
    lastName: "Doe",
    books: [books.ANNA_KARENINA_2008, books.WAR_PIECE_2009, books.BESY_2015],
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
    books: [
        books.ANNA_KARENINA_2014,
        books.ANNA_KARENINA_2013,
        books.BLACK_SWAN_2021,
        books.CRIME_PUNISHMENT_2012,
        books.KARAMAZOVS_BROTHERS_2015,
    ],
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
    books: [
        books.BLACK_SWAN_2021,
        books.FIGHT_CLUB_2014,
        books.GOT__DANCE_OF_DRAGONS_2019,
        books.GOT__STORM_OF_SWORDS_2018,
    ],
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
    books: [
        books.N1984_2013,
        books.IDIOT_2015,
        books.REFACTORING_2008,
        books.WRITE_CUT_2020,
        books.PERFECT_PROGRAMMER_2021,
        books.CHOKE_2006,
        books.FIGHT_CLUB_2018,
    ],
    closedOrders: [books.GOT__DANCE_OF_DRAGONS_2019],
    openedOrders: [...orders.getOrderBooks(), ...orders.getOrderBooks()],
    reservations: [books.BRAVE_NEW_WORLD_2017],
    roles: [roles.USER],
    statusBan: false,
    wallet: {
        moneyCount: 300,
    },
};

export const __VIEWER = BRAD_DOE;

export const getAll = () => [JOHN_DOE, JULY_DOE, JANE_DOE, BRAD_DOE];
