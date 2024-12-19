import { Blog, BlogPreview, CreateBlogModel } from "@/app/models/Blog";
import { Page } from "@/app/models/General";
import { get, post } from "@/utils/axiosUtils";

export async function getAllBlogPreview() {
    const result = await get(`/blogs/previews`, `/blog`);
    return result as Page<Blog>
}
export async function getBlogBySlug(slug: string) {
    const result: Blog = await get(`/blogs/${slug}`, `/blog/${slug}`);
    return result;
}

export const createBlog = async (data: CreateBlogModel) => {
    const result = await post("/blogs", data, "/blog/create");
    return result
}