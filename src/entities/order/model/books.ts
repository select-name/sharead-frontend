import { useStore, useStoreMap } from "effector-react";

import { bookModel } from "entities/book";
import * as fapi from "shared/fixtures";
import { browser } from "shared/lib";
import * as events from "./events";

// FIXME: fetch later by API
// export const initialState = fapi.orders.getOrderBooks().map((it) => it.id);
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
    const price = books.map(fapi.books.getPseudoPrice).reduce((a, b) => a + b, 0);

    return { books, price };
};

export const useRecommended = () => {
    const books = fapi.orders.getRecommendedBooks();
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
