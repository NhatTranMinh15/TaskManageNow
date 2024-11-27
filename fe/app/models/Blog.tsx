import Image from "next/image";
import { User } from "./User";
import { TImage, TLink } from "./General";
import { ReactNode } from "react";

export enum EntryType {
    FORMAT_STANDARD = "format-standard",
    FORMAT_AUDIO = "format-audio",
    FORMAT_QUOTE = "format-quote",
    FORMAT_GALLERY = "format-gallery",
    FORMAT_LINK = "format-link",
    FORMAT_VIDEO = "format-video",
}
export enum BlogType {
    FORMAT_STANDARD = "format-standard",
    FORMAT_AUDIO = "format-audio",
    FORMAT_GALLERY = "format-gallery",
    FORMAT_VIDEO = "format-video",
}
export type BlogMetadata = {
    date: Date;
    categories: TLink[]
}

export type Blog = {
    id: string;
    type: BlogType;
    thumbnail: {
        src: string;
        alt: string;
    }
    title: string;
    slug: string;
    metatdata: BlogMetadata;
    lead: string;
    content: (string | React.ReactNode)[];
    tags: TLink[]
    author: User
}

export type Article = {
    id?: string;
    thumbnail: TImage
    slug: string;
    link: string;
    type: EntryType;
    title: string;
    categories: TLink[];
    excerpt?: string;
    quotes?: ReactNode[];
    slider?: TImage[];
    audio?: string;
    video?: string;
}

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
};

export const parseDate = (date: Date) => {
    return date.toLocaleDateString('en-US', options);
}