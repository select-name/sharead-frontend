import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { bookModel } from "entities/book";

export const toggleBook = createEvent<number>();

export const initialState: number[] = [];

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
