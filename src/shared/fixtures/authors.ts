import type { Author } from "entities/types";

export const TOLSTOY: Author = {
    id: 1,
    dateOfBirth: "1828-09-09T00:00:00",
    firstName: "Лев",
    middleName: "Николаевич",
    lastName: "Толстой",
};

export const PALAHNIUK: Author = {
    id: 2,
    dateOfBirth: "1962-02-21T00:00:00",
    firstName: "Чак",
    lastName: "Паланик",
};

export const TALEB: Author = {
    id: 3,
    dateOfBirth: "1960-09-11T00:00:00",
    firstName: "Нассим",
    middleName: "Николас",
    lastName: "Талеб",
};

export const DOSTOEVSKY: Author = {
    id: 4,
    dateOfBirth: "1821-11-11T00:00:00",
    firstName: "Федор",
    middleName: "Михайлович",
    lastName: "Достоевский",
};

export const BOB_MARTIN: Author = {
    id: 5,
    // FIXME: Не у всех авторов известны дата рождения
    dateOfBirth: "1952-01-01T00:00:00",
    firstName: "Роберт",
    middleName: "Сесил",
    lastName: "Мартин",
};

// jason schreier
export const SCHREIER: Author = {
    id: 6,
    dateOfBirth: "1987-05-10T00:00:00",
    firstName: "Джейсон",
    lastName: "Шрейер",
};

export const MAX_ILYAHOV: Author = {
    id: 7,
    firstName: "Максим",
    lastName: "Ильяхов",
};

export const LUDMILA_SARYCHEVA: Author = {
    id: 8,
    firstName: "Людмила",
    lastName: "Сарычева",
};

export const MARTIN_FAULER: Author = {
    id: 9,
    firstName: "Мартин",
    lastName: "Фаулер",
};

export const ORWELL: Author = {
    id: 10,
    dateOfBirth: "1903-06-25T00:00:00",
    firstName: "Джордж",
    lastName: "Оруэлл",
};

export const HUXLEY: Author = {
    id: 11,
    dateOfBirth: "1894-07-26T00:00:00",
    firstName: "Олдос",
    lastName: "Хаксли",
};

export const SAPKOWSKI: Author = {
    id: 12,
    dateOfBirth: "1948-06-21T00:00:00",
    firstName: "Анджей",
    lastName: "Сапковский",
};

export const GEORGE_MARTIN: Author = {
    id: 13,
    dateOfBirth: "1948-09-20T00:00:00",
    firstName: "Джордж",
    middleName: "Р.Р.",
    lastName: "Мартин",
};

export const getAll = () => [
    TOLSTOY,
    PALAHNIUK,
    TALEB,
    DOSTOEVSKY,
    BOB_MARTIN,
    SCHREIER,
    MAX_ILYAHOV,
    LUDMILA_SARYCHEVA,
    MARTIN_FAULER,
    ORWELL,
    HUXLEY,
    SAPKOWSKI,
    GEORGE_MARTIN,
];

export const toString = (entity: Author) =>
    `${entity.firstName} ${entity.middleName} ${entity.lastName}`;

/**
 * Получить инициалы по имени человека
 * @return {Фамилия И.О.}
 */
export const getInitials = (entity: Author) => {
    const { firstName, middleName, lastName } = entity;

    const shortFirstName = firstName ? `${firstName.charAt(0)}.` : "";
    const shortMiddleName = middleName ? `${middleName.charAt(0)}.` : "";
    const shortLastName = lastName ?? "";
    return `${shortLastName} ${shortFirstName}${shortMiddleName}`.trim();
};

export const getShortname = (entity: Author) => `${entity.firstName} ${entity.lastName}`;
