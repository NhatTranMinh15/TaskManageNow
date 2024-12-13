import { StaticImageData } from "next/image";
import { CSSProperties } from "react";

export type Header = {
    name: string,
    value: string,
    isCurrentlySorted: boolean,
    colStyle: CSSProperties,
    hiddenOnSmall: boolean
}

export type URLParams = {
    search: string;
    page: string;
    size: string;
    sort: string;
}

export type Error = {
    message: string;
    status: string | number;
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
