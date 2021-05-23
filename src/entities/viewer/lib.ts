import dayjs from "dayjs";
import pluralize from "plural-ru";
import type { Order } from "shared/api";

// Да здравствует свалка хелперов!

// FIXME: @temp
export const getDaysLabel = (days: number) => pluralize(days, "%d день", "%d дня", "%d дней");

export const getOrderInfo = (order: Order) => {
    const { status, deliveredAt, endAt } = order;

    if (status === "WAITING_TRANSFER") {
        const diff = dayjs(deliveredAt).diff(dayjs(), "days");
        return `Будет доставлено через ${getDaysLabel(diff)}`;
    }
    if (status === "RENTED") {
        const diff = dayjs(endAt).diff(dayjs(), "days");
        return `Осталось: ${getDaysLabel(diff)}`;
    }

    return "";
};
