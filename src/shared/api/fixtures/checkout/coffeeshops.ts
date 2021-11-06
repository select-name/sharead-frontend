import dayjs from "dayjs";
import type { CoffeeShop } from "../../types";

export const COFFEBEAN: CoffeeShop = {
    id: 1,
    name: "Coffee Bean",
    address: "ул. Университетская, д.8",
    deliveryAt: dayjs().add(4, "days").toISOString(),
};

export const COFFESHOP_COMPANY: CoffeeShop = {
    id: 2,
    name: "Coffeeshop Company (Венская кофейня)",
    address: "ул. Баумана, д.38/17",
    deliveryAt: dayjs().add(7, "days").toISOString(),
};

export const SKURATOV: CoffeeShop = {
    id: 3,
    name: "Skuratov",
    address: "ул. Пушкина, д.5/43",
    deliveryAt: dayjs().add(1, "days").toISOString(),
};

export const getAll = () => [COFFEBEAN, COFFESHOP_COMPANY, SKURATOV];
