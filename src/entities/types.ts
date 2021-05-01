// FIXME: temp, resolve better later
// FIXME: access from shared/fixtures!!!

export type Author = {
    id: number;
    dateOfBirth?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type Publisher = {
    id: number;
    name: string;
    city: string;
};

export type AbstractBook = {
    id: number;
    name: string;
    authors: Author[];
    publicationYear: number;
    publishingHouse: Publisher;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    cover: any;
};
