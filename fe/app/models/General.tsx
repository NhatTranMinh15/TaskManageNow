import { StaticImageData } from "next/image";

export type PageableModel = {
    page: number;
    size: number;
    sort: string;
}

export type SearchPageableModel = PageableModel & {
    search: string;
}

export type Page<T> = {
    content: T[];
    totalPage: number;
    currentPage: number;
    totalElements: number;
}
export const emptyPage: Page<any> = {
    content: [],
    currentPage: 1,
    totalElements: 0,
    totalPage: 0
}
export type TLink = {
    link: string;
    name: string;
}
export type TImage = {
    id?: string;
    src: string;
    image?: StaticImageData;
    alt: string;
    width?: number;
    height?: number;
    meta?: string[];
}
