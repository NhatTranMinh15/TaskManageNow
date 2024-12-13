import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BlogPreview } from '../models/Blog'

type Props = {
    blog: BlogPreview
}
function parseDatetime(date: Date | string) {
    if (typeof date === "string") {
        date = new Date(date)
    }
    return date.toLocaleDateString("en-UK", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}
const BlogPreviewCard = ({ blog }: Props) => {
    const { id, title, slug, category, preview, thumbnail, views, author, authorId, createdAt, } = blog
    return (
        <div className='relative flex flex-col md:flex-row border-2 border-[rgb(15,150,15)] rounded-3xl'>
            <div className='relative basis-1/4 min-h-60 md:min-h-0'>
                <Image src={thumbnail.url} alt={thumbnail.alt} fill className='rounded-t-3xl md:rounded-s-3xl md:rounded-tr-none'></Image>
            </div>
            <div className='box-content basis-3/4 max-h-60 flex flex-col gap-2 p-3'>
                <div className='metadata flex justify-between items-center sm:px-6'>
                    <Link href={`/user/${authorId}`} className='hover:underline duration-150 max-w-[15ch] truncate'>{author ? `${author?.firstName} ${author?.lastName}` : `${authorId}`}</Link>
                    <span>{`${parseDatetime(createdAt)}`}</span>
                    <span className='flex items-center'>
                        {`${views}`}
                        <span className='text-2xl ml-1'> {'👁'}</span>
                    </span>
                </div>
                <div className='flex justify-center items-center'>
                    <Link href={`/blog/${slug}`} className='font-bold text-2xl'>{title}</Link>
                </div>
                <div className='flex justify-center items-center gap-6'>
                    {category.map((c) => {
                        return <Link key={c.id} href={`/blog?category=${c.value}`} className='border border-[rgb(15,15,15)] rounded-3xl px-3'>{c.name}</Link>
                    })}
                </div>
                <div className='flex h-full overflow-auto'>
                    <p className='text-justify'>{preview}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPreviewCard