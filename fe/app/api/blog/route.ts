import { BlogPreview, blogs } from "@/app/models/Blog";

export async function getAllBlogPreview() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return blogs as BlogPreview[]
}
export async function getBlogBySlug(slug: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase())
}