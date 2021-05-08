import { fakeApi } from "shared/api";
import { books as sBooks, duration as sDuration } from "./stores";

// FIXME: useStoreMap instead
export const useOrder = () => {
    const books = sBooks.useOrderBooks();
    const durations = sDuration.useOrderDurations();

    const price = books
        .map((b) => {
            const price = fakeApi.books.getPseudoPrice(b);
            const coeff = durations[b.id] / sDuration.DEFAULT_DURATION;
            return Math.floor(price * coeff);
        })
        .reduce((a, b) => a + b, 0);

    return { books, price };
};
