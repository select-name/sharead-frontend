import { createEvent, createStore } from "effector";
import { useStore, useStoreMap } from "effector-react";

import { bookModel } from "entities/book";
import * as fapi from "shared/fixtures";

export const toggleBook = createEvent<number>();

// FIXME: fetch later by API
export const initialState = fapi.orders.getOrderBooks().map((it) => it.id);

export const $store = createStore<typeof initialState>(initialState).on(
    toggleBook,
    (state, payload) => {
        if (state.includes(payload)) {
            return state.filter((it) => it !== payload);
        }
        return [...state, payload];
    },
);

export const useOrderBooks = () => {
    const books = bookModel.useBooks();
    const orderIds = useStore($store);
    return books.filter((b) => orderIds.includes(b.id));
};

// FIXME: useStoreMap instea
export const useOrder = () => {
    const books = useOrderBooks();
    const price = books.map(fapi.books.getPseudoPrice).reduce((a, b) => a + b);

    return { books, price };
};

export const useBookStatus = (bookId: number) => {
    const isBookInCart = useStoreMap({
        store: $store,
        keys: [bookId],
        fn: (state, [bookId]) => state.includes(bookId),
    });

    return { isBookInCart };
};
