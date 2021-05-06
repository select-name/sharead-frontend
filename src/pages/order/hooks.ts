import { useViewerWallet } from "entities/viewer";
import * as fapi from "shared/fixtures";

export const useOrder = () => {
    const { wallet, payment } = useViewerWallet();
    const books = fapi.orders.getOrderBooks();
    const recommended = fapi.orders.getRecommendedBooks();

    const price = books.map(fapi.books.getPseudoPrice).reduce((a, b) => a + b);
    const isEnoughMoney = wallet >= price;
    return { wallet, price, isEnoughMoney, payment, books, recommended };
};
