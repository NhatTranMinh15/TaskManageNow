import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BlogPreview } from '../models/Blog'
import { getOneUser } from '../api/user/route'
import { parseDatetime } from '@/utils/GeneralUtils'

type Props = {
    blog: BlogPreview
}

const BlogPreviewCard = async ({ blog }: Props) => {
    const { id, title, slug, categories, preview, thumbnail,thumbnailAlt, views, authorId, createdAt, } = blog
    const author = await getOneUser(authorId, "/blog")
    return (
        <div className='relative flex flex-col md:flex-row border-2 border-[rgb(15,150,15)] rounded-3xl'>
            <div className='relative basis-1/4 min-h-60 md:min-h-0'>
                {
                    thumbnail? 
                    <Image src={thumbnail} alt={thumbnailAlt || ""} fill className='rounded-t-3xl md:rounded-s-3xl md:rounded-tr-none'></Image>
                    :''
                }
            </div>
            <div className='box-content basis-3/4 max-h-60 flex flex-col gap-2 p-3'>
                <div className='metadata flex justify-between items-center sm:px-6'>
                    <Link href={`/user/${authorId}`} className='hover:underline duration-150 max-w-[15ch] truncate'>{author ? `${author.firstName} ${author.lastName}` : ""}</Link>
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
                    {categories.map((c) => {
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