type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BlogPreview = Optional<Blog, "content">
export type Blog = {
    id: string;
    title: string;
    slug: string;
    preview: string;
    content: string;
    category: Category[];
    views: string;
    thumbnail: TImage;
    image: TImage[];
    authorId: string;
    author?: Author
    createdAt: Date;
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
export type TImage = {
    id: string;
    url: string;
    alt: string;
}

export const categories: Category[] = [
    { id: "1", name: "Technology", value: "technology" },
    { id: "2", name: "Health", value: "health" },
    { id: "3", name: "Travel", value: "travel" },
    { id: "4", name: "Education", value: "education" }
];

export const blogs: Blog[] = [
    {
        id: "e10a3e30-adf9-4747-875f-e42a87d647ac",
        title: "The Future of AI",
        slug: "the-future-of-ai",
        category: [categories[0], categories[2]],
        preview: "Artificial Intelligence (AI) is set to revolutionize numerous industries, from healthcare to finance, with its rapid advancements. In the near future, we can expect AI to enhance machine learning algorithms, leading to more accurate predictions and smarter decision-making processes. One of the most exciting developments is in natural language processing, where AI will achieve human-like proficiency, making interactions with machines more intuitive and efficient.",
        views: "1500",
        authorId: "c24ba545-f3ed-4657-a495-b66c2eea667f",
        author: {
            id: "c24ba545-f3ed-4657-a495-b66c2eea667f",
            username: "tech_guru",
            firstName: "Alice",
            lastName: "Smith"
        },
        createdAt: new Date("2024-01-01"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        content: `# Welcome to StackEdit!

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.


# Files

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Switch to another file

\`\`\`whooooooooooooooooooo\`\`\`

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.
`,
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }
    },
    {
        id: "61e63771-eca1-499c-8d0c-f3cf8b20e213",
        title: "Healthy Living Tips",
        category: [categories[1]],
        preview: "Tips and tricks for maintaining a healthy lifestyle.",
        views: "2300",
        authorId: "50332860-db23-40f0-897e-964fb8357039",
        author: {
            id: "50332860-db23-40f0-897e-964fb8357039",
            username: "health_expert",
            firstName: "Bob",
            lastName: "Johnson"
        },
        createdAt: new Date("2024-02-15"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        slug: "healthy-living-tips",
        content: "```whoooooooooooooooooooooooo ```",
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }

    },
    {
        id: "b7ad7efe-b7bb-44d5-a4cb-9d7f7f5cb8dd",
        title: "Top Travel Destinations 2024",
        category: [categories[2]],
        preview: "Explore the best travel destinations for 2024.",
        views: "1800",
        authorId: "f554d924-600f-4c00-8e13-c3e0bdd075d6",
        createdAt: new Date("2024-03-10"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        slug: "",
        content: "",
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }

    },
    {
        id: "a97fc79a-3fa5-4f52-9795-f49d0755e60f",
        title: "Online Learning Platforms",
        category: [categories[3], categories[2]],
        preview: "A review of the top online learning platforms.",
        views: "1200",
        authorId: "deb136e8-7b6e-46b1-8f34-13bd5b1b6809",
        createdAt: new Date("2024-04-05"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        slug: "",
        content: "",
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }

    },
    {
        id: "a97fc79a-3fa5-4f52-9795-f49d0100e60f",
        title: "Online Learning Platforms",
        category: [categories[3], categories[2]],
        preview: "A review of the top online learning platforms.",
        views: "1200",
        authorId: "deb136e8-7b6e-46b1-8f34-13bd5b1b6809",
        createdAt: new Date("2024-04-05"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        slug: "",
        content: "",
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }

    },
    {
        id: "a97fc79a-3fa5-4f52-9795-f49dcee5e60f",
        title: "Online Learning Platforms",
        category: [categories[3], categories[2]],
        preview: "A review of the top online learning platforms.",
        views: "1200",
        authorId: "deb136e8-7b6e-46b1-8f34-13bd5b1b6809",
        createdAt: new Date("2024-04-05"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        slug: "",
        content: "",
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }

    },
    {
        id: "a97fc79a-3fa5-4f52-9795-f49d0ce5e60f",
        title: "Online Learning Platforms",
        category: [categories[3], categories[2]],
        preview: "A review of the top online learning platforms.",
        views: "1200",
        authorId: "deb136e8-7b6e-46b1-8f34-13bd5b1b6809",
        createdAt: new Date("2024-04-05"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        slug: "",
        content: "",
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }

    },
    {
        id: "a97fc79a-3fa5-4f52-9795-f49d6723e60f",
        title: "Online Learning Platforms",
        category: [categories[3], categories[2]],
        preview: "A review of the top online learning platforms.",
        views: "1200",
        authorId: "deb136e8-7b6e-46b1-8f34-13bd5b1b6809",
        createdAt: new Date("2024-04-05"),
        image: [{ id: "1", url: "https://picsum.photos/500", alt: "" }],
        slug: "",
        content: "",
        thumbnail: { id: "1", url: "https://picsum.photos/500", alt: "" }

    },
];
