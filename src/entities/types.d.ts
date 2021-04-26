// FIXME: temp, resolve better later

declare type Author = {
    id: number;
    dateOfBirth?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
};

declare type Publisher = {
    id: number;
    name: string;
    city: string;
};

declare type AbstractBook = {
    id: number;
    name: string;
    authors: Author[];
    publicationYear: number;
    publishingHouse: Publisher;
};
