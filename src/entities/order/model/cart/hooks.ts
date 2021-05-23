import { useStore, useStoreMap } from "effector-react";

import { bookModel } from "entities/book";
import { fakeApi } from "shared/api";
import { $books, $durations, DEFAULT_DURATION } from "./store";

export const useOrderDurations = () => useStore($durations);

export const useOrderBooks = () => {
    const books = bookModel.useBooks();
    const orderIds = useStore($books);
    return books.filter((b) => orderIds.includes(b.id));
};

const RECOMMEND_MAX = 6;

export const useRecommended = () => {
    const order = useOrderBooks();
    const orderIds = order.map((b) => b.id);
    const totalBooks = bookModel.useBooks();

    const orderAuthors = order
        .map((b) => b.authors)
        .flat()
        .map((a) => a.id);

    const otherBooks = totalBooks.filter((b) => !orderIds.includes(b.id));

    const booksByAuthor = otherBooks.filter((b) =>
        b.authors.some((a) => orderAuthors.includes(a.id)),
    );
    const lenA = booksByAuthor.length;
    const booksByAuthorLimited = booksByAuthor.filter((b) => Math.random() < RECOMMEND_MAX / lenA);
    const booksByAuthorLimitedIds = booksByAuthorLimited.map((b) => b.id);
    const booksPopular = otherBooks
        .filter(fakeApi.books.isPopular)
        .filter((b) => !booksByAuthorLimitedIds.includes(b.id));
    const books = [...booksByAuthorLimited, ...booksPopular];

    return { books };
};
export const useBookStatus = (bookId: number) => {
    const isBookInCart = useStoreMap({
        store: $books,
        keys: [bookId],
        fn: (state, [bookId]) => state.includes(bookId),
    });

    return { isBookInCart };
};

// FIXME: useStoreMap instead
export const useOrder = () => {
    const books = useOrderBooks();
    const durations = useOrderDurations();

    const price = books
        .map((b) => {
            const price = fakeApi.books.getPseudoPrice(b);
            const coeff = durations[b.id] / DEFAULT_DURATION;
            return Math.floor(price * coeff);
        })
        .reduce((a, b) => a + b, 0);

    return { books, price };
};

export const useOrderValidation = () => {
    const bookIds = useStore($books);
    const isEmptyCart = bookIds.length === 0;

    return { isEmptyCart };
};
