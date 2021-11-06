import { useStore, useStoreMap } from "effector-react";
// import { bookModel } from "entities/books";
import { fakeApi } from "shared/api";
import { $reservations } from "./store";

export const useReservationBooks = () => {
    // const books = bookModel.useBooks();
    const resIds = useStore($reservations);
    // return books.filter((b) => resIds.includes(b.id));
    return fakeApi.library.books.getByIds(resIds);
};

export const useBookReservationStatus = (bookId: number) => {
    const isBookReserved = useStoreMap({
        store: $reservations,
        keys: [bookId],
        fn: (state, [bookId]) => state.includes(bookId),
    });

    return { isBookReserved };
};
