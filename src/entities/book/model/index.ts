import { createStore } from "effector";
import { useStore, useStoreMap } from "effector-react";
import * as fapi from "shared/fixtures";

// FIXME: Фетчить позднее через эффект
export const initialState = fapi.books.getAll();

export const $store = createStore<typeof initialState>(initialState);

export const useBooks = () => useStore($store);

export const useBook = (bookId: number) =>
    useStoreMap({
        store: $store,
        keys: [bookId],
        fn: (books, [bookId]) => books.find(({ id }) => id === bookId),
    });
