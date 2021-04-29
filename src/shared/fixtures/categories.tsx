import { BookOutlined } from "@ant-design/icons";
import type { Category } from "entities/types";

// Художественные
// Бизнес-литература
// Нехудожественная
// Букинистика
// Русская литература
// Учебная литература

// FIXME: Позже, вместо иконок, юзать ссылки на изображения

export const IMAGINATIVE: Category = {
    id: 1,
    name: "Художественная литература",
    slug: "hudozhestvennaya-literatura",
    description: "Классика, фэнтези, детективы, экранизированные",
    cover: <BookOutlined />,
};

export const NOT_IMAGINATIVE: Category = {
    id: 2,
    name: "Нехудожественная литература",
    slug: "nehudozhestvennaya-literatura",
    description: "Искусство, саморазвитие, о здоровье",
    cover: <BookOutlined />,
};

export const BUSINESS: Category = {
    id: 3,
    name: "Бизнес литература",
    slug: "biznes-literatura",
    description: "Биографии, управление, инвестиции, маркетинг",
    cover: <BookOutlined />,
};

export const getAll = () => [IMAGINATIVE, NOT_IMAGINATIVE, BUSINESS];
