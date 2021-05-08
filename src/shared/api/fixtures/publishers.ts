import type { Publisher } from "../types";

export const AST: Publisher = {
    id: 1,
    name: "АСТ",
    city: "Москва",
};

export const COLIBRI: Publisher = {
    id: 2,
    name: "КоЛибри",
    city: "Москва",
};

export const EKSMO: Publisher = {
    id: 3,
    name: "Эксмо",
    city: "Москва",
};

export const GOS_PUB: Publisher = {
    id: 4,
    name: "Государственное издательство художественной литературы",
    city: "Москва",
};

export const AZBUKA: Publisher = {
    id: 5,
    name: "Азбука",
    city: "Санкт-Петербург",
};

export const LENIZDAT: Publisher = {
    id: 6,
    name: "Лениздат",
    city: "Санкт-Петербург",
};

export const PITER: Publisher = {
    id: 7,
    name: "Питер",
    city: "Санкт-Петербург",
};

export const BOMBORA: Publisher = {
    id: 8,
    name: "Бомбора",
    city: "Москва",
};

export const ALPINA_PUB: Publisher = {
    id: 9,
    name: "Альпина Паблишер",
    city: "Москва",
};

export const SYM_PLUS: Publisher = {
    id: 10,
    name: "Символ-Плюс",
    city: "Москва",
};

export const toString = (entity: Publisher) => entity.name;

export const getAll = () => [
    AST,
    COLIBRI,
    EKSMO,
    GOS_PUB,
    AZBUKA,
    LENIZDAT,
    PITER,
    BOMBORA,
    ALPINA_PUB,
    SYM_PLUS,
];
