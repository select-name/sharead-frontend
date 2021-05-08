import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import * as books from "./books";

export const setBookDuration = createEvent<{ bookId: number; duration: number | undefined }>();

export const DEFAULT_DURATION = 14;

export const initialState = books.initialState.reduce(
    (acc: Record<number, number | undefined>, it) => {
        acc[it] = DEFAULT_DURATION;
        return acc;
    },
    {},
);
export const $store = createStore<typeof initialState>(initialState)
    .on(setBookDuration, (state, { bookId, duration }) => {
        return { ...state, [bookId]: duration };
    })
    .on(books.toggleBook, (state, payload) => {
        const duration = state[payload] ? undefined : DEFAULT_DURATION;
        setBookDuration({ bookId: payload, duration });
    });

export const useOrderDurations = () => useStore($store);
