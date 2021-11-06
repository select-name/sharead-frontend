import { createStore } from "effector";
import { useStore, useStoreMap } from "effector-react";
import { fakeApi } from "shared/api";

// FIXME: Фетчить позднее через эффект
export const initialState = fakeApi.library.books.getAll();

export const $store = createStore<typeof initialState>(initialState);

export const useBooks = () => useStore($store);

export const useBook = (bookId: number) =>
    useStoreMap({
        store: $store,
        keys: [bookId],
        fn: (books, [bookId]) => books.find(({ id }) => id === bookId),
    });
