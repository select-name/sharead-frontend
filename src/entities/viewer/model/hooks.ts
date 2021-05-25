import { useState } from "react";
import { useStore, useStoreMap } from "effector-react";

import { bookModel } from "entities/book";
import { fakeApi } from "shared/api";
import { browser } from "shared/lib";
import * as lib from "../lib";
import { fav } from "./stores";

export const useFavBooks = () => {
    const books = bookModel.useBooks();
    const favIds = useStore(fav.$store);
    return books.filter((b) => favIds.includes(b.id));
};

export const useBookFavStatus = (bookId: number) => {
    const isBookFav = useStoreMap({
        store: fav.$store,
        keys: [bookId],
        fn: (state, [bookId]) => state.includes(bookId),
    });

    return { isBookFav };
};

export const useViewer = () => {
    return fakeApi.users.getViewer();
};

export const useViewerNormalized = () => {
    const viewer = useViewer();

    return lib.getUserNormalized(viewer);
};

const WALLET_MONEY = 300;

export const useViewerWallet = () => {
    // const wallet = useViewer().wallet;
    const [wallet, setWallet] = browser.useLocalStorage("fakeWallet", WALLET_MONEY);
    const [paymentPending, setPaymentPending] = useState(false);

    const applyTransaction = (diff: number) => {
        setPaymentPending(true);

        return new Promise((resolve) => {
            setTimeout(() => {
                setWallet(wallet + diff);
                setPaymentPending(false);
                resolve({ status: 200 });
            }, 1000);
        });
    };

    const payment = {
        isPending: paymentPending,
        applyTransaction,
    };

    return { wallet, payment };
};
