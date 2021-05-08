import { useState } from "react";

import { fakeApi } from "shared/api";
import { browser } from "shared/lib";

export const useViewer = () => {
    return fakeApi.users.__VIEWER;
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
