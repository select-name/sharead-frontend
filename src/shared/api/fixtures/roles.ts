import type { Role } from "../types";

export const USER: Role = {
    id: 1,
    name: "Пользователь",
};

export const MODERATOR: Role = {
    id: 2,
    name: "Модератор",
};

export const ADMIN: Role = {
    id: 3,
    name: "Администратор",
};

export const getAll = [USER, MODERATOR, ADMIN];
