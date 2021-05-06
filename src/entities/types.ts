// FIXME: temp, resolve better later
// FIXME: access from shared/fixtures!!!

export type User = {
    id: number;
    books: AbstractBook[];
    // chats: Chat[]
    // closedOrders: Order[];
    // openedOrders: Order[];
    // reservations: Reservation[];
    email: string;
    emailVerified: boolean;
    firstName: string;
    middleName?: string;
    lastName: string;
    roles: Role[];
    statusBan: boolean;
    wallet?: Wallet;
};

export type Order = {
    id: number;
};

export type Reservation = {
    id: number;
};

export type Wallet = {
    // id: number;
    moneyCount: number;
    // transactions: Transaction[];
    // userId: number;
};

export type Transaction = {
    id: number;
    dateTime: string;
    moneyCount: number;
    status: string;
    // walletId: number;
};

export type Role = {
    id: number;
    name: string;
};

export type Author = {
    id: number;
    dateOfBirth?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    avatar?: any;
};

export type Publisher = {
    id: number;
    name: string;
    city: string;
};

export type AbstractBook = {
    id: number;
    name: string;
    authors: Author[];
    publicationYear: number;
    publishingHouse: Publisher;
    category: Category;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    cover: any;
};
