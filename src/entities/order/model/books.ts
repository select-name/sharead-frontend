import { useStore, useStoreMap } from "effector-react";

import { bookModel } from "entities/book";
import { fakeApi } from "shared/api";
import { browser } from "shared/lib";
import * as events from "./events";

// FIXME: fetch later by API
// export const initialState = fakeApi.orders.getOrderBooks().map((it) => it.id);
export const initialState: number[] = [];

export const $store = browser
    .createPersistStore(initialState, { name: "entities/order/books" })
    .on(events.toggleBook, (state, payload) => {
        if (state.includes(payload)) {
            return state.filter((it) => it !== payload);
        }
        return [...state, payload];
    })
    .reset(events.submitOrder);

export const useOrderBooks = () => {
    const books = bookModel.useBooks();
    const orderIds = useStore($store);
    return books.filter((b) => orderIds.includes(b.id));
};

// FIXME: useStoreMap instea
export const useOrder = () => {
    const books = useOrderBooks();
    const price = books.map(fakeApi.books.getPseudoPrice).reduce((a, b) => a + b, 0);

    return { books, price };
};

const RECOMMEND_MAX = 6;

export const useRecommended = () => {
    const order = useOrderBooks();
    const orderIds = order.map((b) => b.id);
    const totalBooks = bookModel.useBooks();

    const orderAuthors = order
        .map((b) => b.authors)
        .flat()
        .map((a) => a.id);

    const otherBooks = totalBooks.filter((b) => !orderIds.includes(b.id));

    const booksByAuthor = otherBooks.filter((b) =>
        b.authors.some((a) => orderAuthors.includes(a.id)),
    );
    const lenA = booksByAuthor.length;
    const booksByAuthorLimited = booksByAuthor.filter((b) => Math.random() < RECOMMEND_MAX / lenA);
    const booksByAuthorLimitedIds = booksByAuthorLimited.map((b) => b.id);
    const booksPopular = otherBooks
        .filter(fakeApi.books.isPopular)
        .filter((b) => !booksByAuthorLimitedIds.includes(b.id));
    const books = [...booksByAuthorLimited, ...booksPopular];

    return { books };
};

export const useBookStatus = (bookId: number) => {
    const isBookInCart = useStoreMap({
        store: $store,
        keys: [bookId],
        fn: (state, [bookId]) => state.includes(bookId),
    });

    return { isBookInCart };
};
