import { combine } from "effector";

import * as uuid from "uuid";
import { browser } from "shared/lib";
import { fakeApi, Order } from "shared/api";
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
    .on(events.submitOrder, () => {
        // console.log("$book SUBMIT");
        return [];
    });
// .reset(events.submitOrder);

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
    .on(events.submitOrder, () => {
        // console.log("$durations SUBMIT");
        return {};
    });
// .reset(events.submitOrder);

export const $cart = combine($books, $durations, (books, durations) => {
    return { books, durations };
}).on(events.submitOrder, (state) => {
    const viewer = fakeApi.users.__VIEWER;
    const newOrders: Order[] = state.books.map((aBookId) => {
        return fakeApi.orders.createOrder({
            bookId: fakeApi.users.shuffleByABook(aBookId).id,
            userId: viewer.id,
            status: "WAITING_TRANSFER",
            startDelta: 0,
            deliveredDelta: 2,
            endDelta: state.durations[aBookId],
            costs: fakeApi.books.getPrice(fakeApi.books.getById(aBookId)!),
        });
    });

    viewer.openedOrders.push(...newOrders.map((no) => no.id));

    fakeApi.orders.pushTo(...newOrders);

    // FIXME: hardcoded!
    setTimeout(() => {
        window.location.replace(`/order/result/${uuid.v4()}`);
    }, 0);

    return { books: [], durations: {} };
});

// .reset(events.submitOrder);
// export const $orders = browser
//     .createPersistStore(booksInitialState, { name: "entities/order/cart--order" })
//     .on(events.submitOrder, (state, payload) => {

//     });

// $cart.watch((state) => {
//     console.log("$cart", state);
// });

// $books.watch((state) => {
//     console.log("$books", state);
// });
