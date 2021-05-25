// FIXME: temp, resolve better later
// FIXME: access from shared/fixtures!!!

export type User = {
    id: number;
    books: number[];
    // chats: Chat[]
    // closedOrders: Order[];
    // openedOrders: Order[];
    // reservations: Reservation[];
    closedOrders: number[];
    openedOrders: number[];
    reservations: number[];
    favABooks: number[];
    email: string;
    emailVerified: boolean;
    firstName: string;
    middleName?: string;
    lastName: string;
    roles: Role[];
    statusBan: boolean;
    wallet?: Wallet;
    registeredAt: string;
};

export type Order = {
    id: number;
    bookId: number;
    userId: number;
    startAt: string;
    deliveredAt: string;
    endAt: string;
    costs: number;
    status: "WAITING_TRANSFER" | "RENTED" | "CLOSED";
};

export type Cart = {
    id: number;
    bookIds: number[];
    userId: number;
};

export type Reservation = {
    id: number;
    aBookId: number;
    userId: number;
    // + 1-2 дня на выбор, но не можем заранее закладываться на 7 или 30 дней человек выбирает
    // Ставим по сути "в очередь" на книгу, без особой конкретики
    reservedAt: string;
    status: "PENDING" | "REJECTED" | "RESOLVED";
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

export type Book = {
    id: number;
    abstractBook: AbstractBook;
    costPerDay: number;
    owner: User;
    availableBefore: string;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    cover: any;
};

export type CoffeeShop = {
    id: number;
    name: string;
    address: string;
    deliveryAt: string;
};
