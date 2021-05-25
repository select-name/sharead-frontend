import type { AbstractBook } from "../types";
import * as authors from "./authors";
import * as publishers from "./publishers";
import * as categories from "./categories";

export const FIGHT_CLUB_2014: AbstractBook = {
    id: 8,
    name: "Бойцовский клуб",
    authors: [authors.PALAHNIUK],
    publicationYear: 2014,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const FIGHT_CLUB_2018: AbstractBook = {
    id: 32,
    name: "Бойцовский клуб",
    authors: [authors.PALAHNIUK],
    publicationYear: 2018,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const BLACK_SWAN_2021: AbstractBook = {
    id: 3,
    name: "Черный лебедь",
    authors: [authors.TALEB],
    publicationYear: 2021,
    publishingHouse: publishers.COLIBRI,
    category: categories.BUSINESS,
};

export const CHOKE_2006: AbstractBook = {
    id: 24,
    name: "Удушье",
    authors: [authors.PALAHNIUK],
    publicationYear: 2006,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const CHOKE_2015: AbstractBook = {
    id: 5,
    name: "Удушье",
    authors: [authors.PALAHNIUK],
    publicationYear: 2015,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const WAR_PIECE_2000: AbstractBook = {
    id: 6,
    name: "Война и мир. Том I-II",
    authors: [authors.TOLSTOY],
    publicationYear: 2000,
    publishingHouse: publishers.EKSMO,
    category: categories.IMAGINATIVE,
};

export const WAR_PIECE_1945: AbstractBook = {
    id: 30,
    name: "Война и мир",
    authors: [authors.TOLSTOY],
    publicationYear: 1945,
    publishingHouse: publishers.GOS_PUB,
    category: categories.IMAGINATIVE,
};

export const WAR_PIECE_2009: AbstractBook = {
    id: 1,
    name: "Война и мир. Книга 2",
    authors: [authors.TOLSTOY],
    publicationYear: 2009,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const WAR_PIECE_2021: AbstractBook = {
    id: 9,
    name: "Война и мир (в 2-х книгах) (комплект)",
    authors: [authors.TOLSTOY],
    publicationYear: 2021,
    publishingHouse: publishers.AZBUKA,
    category: categories.IMAGINATIVE,
};

export const ANNA_KARENINA_2013: AbstractBook = {
    id: 10,
    name: "Анна Каренина",
    authors: [authors.TOLSTOY],
    publicationYear: 2013,
    publishingHouse: publishers.EKSMO,
    category: categories.IMAGINATIVE,
};

export const ANNA_KARENINA_2008: AbstractBook = {
    id: 15,
    name: "Анна Каренина",
    authors: [authors.TOLSTOY],
    publicationYear: 2008,
    publishingHouse: publishers.EKSMO,
    category: categories.IMAGINATIVE,
};

export const ANNA_KARENINA_2014: AbstractBook = {
    id: 12,
    name: "Анна Каренина",
    authors: [authors.TOLSTOY],
    publicationYear: 2014,
    publishingHouse: publishers.AZBUKA,
    category: categories.IMAGINATIVE,
};

// FIXME: abstract_abstract_book?

export const CRIME_PUNISHMENT_2015: AbstractBook = {
    id: 13,
    name: "Преступление и наказание",
    authors: [authors.DOSTOEVSKY],
    publicationYear: 2015,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const CRIME_PUNISHMENT_2020: AbstractBook = {
    id: 29,
    name: "Преступление и наказание",
    authors: [authors.DOSTOEVSKY],
    publicationYear: 2020,
    publishingHouse: publishers.AZBUKA,
    category: categories.IMAGINATIVE,
};

export const CRIME_PUNISHMENT_2012: AbstractBook = {
    id: 11,
    name: "Преступление и наказание",
    authors: [authors.DOSTOEVSKY],
    publicationYear: 2012,
    publishingHouse: publishers.LENIZDAT,
    category: categories.IMAGINATIVE,
};

export const IDIOT_2015: AbstractBook = {
    id: 16,
    name: "ИДИОТ",
    authors: [authors.DOSTOEVSKY],
    publicationYear: 2015,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const BESY_2015: AbstractBook = {
    id: 17,
    name: "Бесы",
    authors: [authors.DOSTOEVSKY],
    publicationYear: 2015,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const KARAMAZOVS_BROTHERS_2015: AbstractBook = {
    id: 18,
    name: "Братья Карамазовы",
    authors: [authors.DOSTOEVSKY],
    publicationYear: 2015,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const CLEAN_CODE_2019: AbstractBook = {
    id: 19,
    name: "Чистый код. Создание, анализ и рефакторинг",
    authors: [authors.BOB_MARTIN],
    publicationYear: 2019,
    publishingHouse: publishers.PITER,
    category: categories.NOT_IMAGINATIVE,
};

export const PERFECT_PROGRAMMER_2021: AbstractBook = {
    id: 28,
    name: "Идеальный программист. Как стать профессионалом разработки ПО",
    authors: [authors.BOB_MARTIN],
    publicationYear: 2021,
    publishingHouse: publishers.PITER,
    category: categories.NOT_IMAGINATIVE,
};

export const BLOOD_PIXELS_2018: AbstractBook = {
    id: 21,
    name: "Кровь, пот и пиксели. Обратная сторона индустрии видеоигр. 2-е издание",
    authors: [authors.SCHREIER],
    publicationYear: 2018,
    publishingHouse: publishers.BOMBORA,
    category: categories.BUSINESS,
};

export const WRITE_CUT_2020: AbstractBook = {
    id: 22,
    name: "Пиши, сокращай. Как создавать сильный текст",
    authors: [authors.MAX_ILYAHOV, authors.LUDMILA_SARYCHEVA],
    publicationYear: 2020,
    publishingHouse: publishers.ALPINA_PUB,
    category: categories.NOT_IMAGINATIVE,
};

export const RISKING_SKIN_2021: AbstractBook = {
    id: 23,
    name: "Рискуя собственной шкурой. Скрытая асимметрия повседневной жизни",
    authors: [authors.TALEB],
    publicationYear: 2021,
    publishingHouse: publishers.COLIBRI,
    category: categories.BUSINESS,
};

export const REFACTORING_2008: AbstractBook = {
    id: 4,
    name: "Рефакторинг. Улучшение существующего кода",
    authors: [authors.MARTIN_FAULER],
    publicationYear: 2008,
    publishingHouse: publishers.SYM_PLUS,
    category: categories.NOT_IMAGINATIVE,
};

export const N1984_2013: AbstractBook = {
    id: 25,
    name: "1984",
    authors: [authors.ORWELL],
    publicationYear: 2013,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const BRAVE_NEW_WORLD_2017: AbstractBook = {
    id: 26,
    name: "О дивный новый мир",
    authors: [authors.HUXLEY],
    publicationYear: 2017,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const WITCHER_GE_2020: AbstractBook = {
    id: 27,
    name: "Ведьмак. Подарочное издание",
    authors: [authors.SAPKOWSKI],
    publicationYear: 2020,
    // FIXME:
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const WITCHER__SWALLOW_TOWER_2016: AbstractBook = {
    id: 20,
    name: "Ведьмак. Башня ласточки",
    authors: [authors.SAPKOWSKI],
    publicationYear: 2016,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const WITCHER__THUNDER_SEASON_2016: AbstractBook = {
    id: 14,
    name: "Ведьмак. Сезон гроз",
    authors: [authors.SAPKOWSKI],
    publicationYear: 2016,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const WITCHER__LAST_WISH_2016: AbstractBook = {
    id: 7,
    name: "Ведьмак. Последнее желание",
    authors: [authors.SAPKOWSKI],
    publicationYear: 2016,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const GOT__DANCE_OF_DRAGONS_2019: AbstractBook = {
    id: 31,
    name: "Игра Престолов: Танец с драконами. Грезы и пыль",
    authors: [authors.GEORGE_MARTIN],
    publicationYear: 2019,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const GOT__STORM_OF_SWORDS_2018: AbstractBook = {
    id: 2,
    name: "Игра Престолов: Буря мечей",
    authors: [authors.GEORGE_MARTIN],
    publicationYear: 2018,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const GOT__FEAST_FOR_CROWS_2012: AbstractBook = {
    id: 33,
    name: "Игра Престолов: Пир стервятников",
    authors: [authors.GEORGE_MARTIN],
    publicationYear: 2012,
    publishingHouse: publishers.AST,
    category: categories.IMAGINATIVE,
};

export const getAll = () =>
    [
        FIGHT_CLUB_2014,
        FIGHT_CLUB_2018,
        BLACK_SWAN_2021,
        CHOKE_2006,
        CHOKE_2015,
        WAR_PIECE_2000,
        WAR_PIECE_1945,
        WAR_PIECE_2009,
        WAR_PIECE_2021,
        ANNA_KARENINA_2013,
        ANNA_KARENINA_2008,
        ANNA_KARENINA_2014,
        CRIME_PUNISHMENT_2012,
        CRIME_PUNISHMENT_2015,
        CRIME_PUNISHMENT_2020,
        IDIOT_2015,
        BESY_2015,
        KARAMAZOVS_BROTHERS_2015,
        CLEAN_CODE_2019,
        PERFECT_PROGRAMMER_2021,
        BLOOD_PIXELS_2018,
        WRITE_CUT_2020,
        RISKING_SKIN_2021,
        REFACTORING_2008,
        N1984_2013,
        BRAVE_NEW_WORLD_2017,
        WITCHER_GE_2020,
        WITCHER__SWALLOW_TOWER_2016,
        WITCHER__THUNDER_SEASON_2016,
        WITCHER__LAST_WISH_2016,
        GOT__DANCE_OF_DRAGONS_2019,
        GOT__STORM_OF_SWORDS_2018,
        // Книга, для которой нет владельца и экземпляров
        GOT__FEAST_FOR_CROWS_2012,
    ].sort((a, b) => a.id - b.id);

export const getById = (bookId: number) => {
    return getAll().find((b) => b.id === bookId);
};

export const getByIds = (bookIds: number[]) => {
    return bookIds.map((id) => getById(id)!);
};
export const toString = (entity: AbstractBook) => {
    const author = entity.authors.map(authors.getShortname).join(", ");
    const publisher = publishers.toString(entity.publishingHouse);
    const book = `${entity.name}, ${entity.publicationYear}`;

    return `${author} — ${book} (${publisher})`;
};

export const getShortname = (entity: AbstractBook) => {
    const author = entity.authors.map(authors.getShortname).join(", ");
    const book = `${entity.name}`;

    return `${author} — ${book}`;
};

type GetListParams = {
    search?: string;
    authors?: number[];
    publishers?: number[];
    categories?: number[];
};

// FIXME: move to shared/api later
export const getList = (params: GetListParams) => {
    const books = getAll();
    // FIXME: refine search
    // FIXME: simplify format
    return books
        .filter((book) => !params.search || new RegExp(params.search, "i").test(toString(book)))
        .filter(
            // prettier-ignore
            (book) => !params.publishers?.length || params.publishers.includes(book.publishingHouse.id),
        )
        .filter(
            // prettier-ignore
            (book) => !params.authors?.length || book.authors.some((a) => params.authors?.includes(a.id)),
        )
        .filter(
            (book) => !params.categories?.length || params.categories?.includes(book.category.id),
        );
};

export const getPseudoPrice = (book: AbstractBook) => {
    const fullTitle = toString(book);
    const pseudoFactor = fullTitle.length % 3;
    const factor = pseudoFactor + 2;

    return factor * 50;
};

export const getPopular = () => [BLACK_SWAN_2021, N1984_2013, RISKING_SKIN_2021, WRITE_CUT_2020];

export const isPopular = (book: AbstractBook) =>
    getPopular()
        .map((it) => it.id)
        .includes(book.id);
