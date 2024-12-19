import React from 'react'
import { getAllBlogPreview } from '../api/blog/route';
import BlogPreviewCard from './BlogPreviewCard';
import { emptyPage } from '../models/General';

type Props = {}

const Blog = async (props: Props) => {
    const page = await getAllBlogPreview();
    const blogPreviews = page.content || emptyPage
    return (
        <div className='flex flex-col gap-6 w-4/5'>
            {
                blogPreviews.map((preview) => {
                    return <BlogPreviewCard key={preview.id} blog={preview}></BlogPreviewCard>
                })
            }
        </div>
    )
}

export default Blog