import { browser } from "shared/lib";
import * as events from "../events";

// FIXME: fetch later by API
// export const initialState = fakeApi.viewer.getFavourite().map((it) => it.id);
export const initialState: number[] = [];

export const $store = browser
    .createPersistStore(initialState, { name: "entities/viewer/fav" })
    .on(events.toggleBook, (state, payload) => {
        if (state.includes(payload)) {
            return state.filter((it) => it !== payload);
        }
        return [...state, payload];
    });
