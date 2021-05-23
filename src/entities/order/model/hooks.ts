import { fakeApi } from "shared/api";
import { books as $books, duration as $duration } from "./stores";

// FIXME: useStoreMap instead
export const useOrder = () => {
    const books = $books.useOrderBooks();
    const durations = $duration.useOrderDurations();

    const price = books
        .map((b) => {
            const price = fakeApi.books.getPseudoPrice(b);
            const coeff = durations[b.id] / $duration.DEFAULT_DURATION;
            return Math.floor(price * coeff);
        })
        .reduce((a, b) => a + b, 0);

    return { books, price };
};
