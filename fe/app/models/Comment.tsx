import { UserComment } from "./User"

export type Comment = {
    id: string;
    blog: string;
    user: UserComment;
    content: string;
    createdAt: Date;
    reply: Comment[] | null;
}

