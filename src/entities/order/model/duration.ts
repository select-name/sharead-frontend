import { createStore } from "effector";
import { useStore } from "effector-react";
import * as books from "./books";
import * as events from "./events";

export const DEFAULT_DURATION = 14;

export const initialState = books.initialState.reduce((acc: Record<number, number>, it) => {
    acc[it] = DEFAULT_DURATION;
    return acc;
}, {});
export const $store = createStore<typeof initialState>(initialState)
    .on(events.setBookDuration, (state, { bookId, duration }) => {
        if (duration === undefined) {
            delete state[bookId];
            return state;
        }
        return { ...state, [bookId]: duration };
    })
    .on(events.toggleBook, (state, payload) => {
        const duration = state[payload] ? undefined : DEFAULT_DURATION;
        events.setBookDuration({ bookId: payload, duration });
    })
    .reset(events.submitOrder);

export const useOrderDurations = () => useStore($store);
