import { createStore } from "effector";
import type { Store } from "effector";
import { initLSItem } from "./use-local-storage";

export function createPersistStore<T>(initialState: T, { name }: { name: string }): Store<T> {
    const lsItem = initLSItem<T>(name, initialState);
    const persistedState = lsItem.value;

    const $store = createStore<T>(persistedState);
    $store.watch((state) => {
        lsItem.setValue(state);
    });

    return $store;
}
