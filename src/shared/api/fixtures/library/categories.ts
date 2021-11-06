import type { Category } from "../../types";

// Художественные
// Бизнес-литература
// Нехудожественная
// Букинистика
// Русская литература
// Учебная литература

// FIXME: Позже, вместо иконок, юзать ссылки на изображения
// FIXME: Добавить конкретные произведения

export const IMAGINATIVE: Category = {
    id: 1,
    name: "Художественная литература",
    slug: "hudozhestvennaya-literatura",
    description: "Классика, фэнтези, детективы, экранизированное",
    cover: { style: { color: "#b0a894" } },
};

export const NOT_IMAGINATIVE: Category = {
    id: 2,
    name: "Нехудожественная литература",
    slug: "nehudozhestvennaya-literatura",
    description: "Искусство, саморазвитие, о здоровье",
    cover: { style: { color: "#94b0a3" } },
};

export const BUSINESS: Category = {
    id: 3,
    name: "Бизнес литература",
    slug: "biznes-literatura",
    description: "Биографии, управление, инвестиции, маркетинг",
    cover: { style: { color: "#94a7b0" } },
};

export const getAll = () => [IMAGINATIVE, NOT_IMAGINATIVE, BUSINESS];
