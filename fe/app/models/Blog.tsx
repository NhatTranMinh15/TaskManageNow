type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BlogPreview = Optional<Blog, "content">
export type Blog = {
    id: string;
    title: string;
    slug: string;
    preview: string;
    content: string;
    categories: Category[];
    views: string;
    thumbnail?: string;
    thumbnailAlt?: string;
    authorId: string;
    createdAt: string;
}
export type Category = {
    id: string;
    name: string;
    value: string;
}
export type Author = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}

export type CreateBlogModel = {
    [key: string]: string | string[] | undefined;
    title: string;
    preview: string;
    categories: string[];
    content: string;
}

export const categories: Category[] = [
    { id: "8c098720-d97f-4a10-8d56-9451d2cc9ac3", name: "Technology", value: "technology" },
    { id: "9b6e1fbb-2be8-4f98-bf3f-9f93535816c4", name: "Health", value: "health" },
    { id: "225eb58f-191b-4628-8933-579de769e060", name: "Travel", value: "travel" },
    { id: "2a95911c-d3b6-4387-b114-9c60356581fa", name: "Education", value: "education" }
];

const content = `# Welcome to StackEdit!

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.


# Files

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Switch to another file

\`\`\`whooooooooooooooooooo\`\`\`

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.
`

