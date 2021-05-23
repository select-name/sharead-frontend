import { browser } from "shared/lib";
import * as events from "./events";

export const DEFAULT_DURATION = 14;

// FIXME: init later by API
export const booksInitialState: number[] = [];

export const $books = browser
    .createPersistStore(booksInitialState, { name: "entities/order/cart--books" })
    .on(events.toggleBook, (state, payload) => {
        if (state.includes(payload)) {
            return state.filter((it) => it !== payload);
        }
        return [...state, payload];
    })
    .reset(events.submitOrder);

export const durationsInitialState: Record<number, number> = {};

export const $durations = browser
    .createPersistStore(durationsInitialState, { name: "entities/order/cart--duration" })
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
