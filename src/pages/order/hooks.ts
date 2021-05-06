import { useViewerWallet } from "entities/viewer";
import * as fapi from "shared/fixtures";

export const useOrder = () => {
    const { wallet, payment } = useViewerWallet();
    const price = 500;
    const isEnoughMoney = wallet >= price;
    const books = fapi.orders.getOrderBooks();
    const recommended = fapi.orders.getRecommendedBooks();
    return { wallet, price, isEnoughMoney, payment, books, recommended };
};
