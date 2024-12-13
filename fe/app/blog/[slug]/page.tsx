import { getBlogBySlug } from '@/app/api/blog/route'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import ViewCountSkeleton from './ViewCountSkeleton'
import ViewCount from './ViewCount'

type Props = {
  params: Promise<{ slug: string }>
}

const md = markdownit()

const BlogDetail = async ({ params }: Props) => {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) {
    notFound()
  }

  const { id, title, content, category, createdAt, thumbnail, image, views, authorId, author } = blog
  const parsedContent = md.render(content)
  return (
    <div className="flex flex-col gap-6 justify-center w-[60vw]">
      <div className='text-4xl font-bold'>
        {title}
      </div>
      <div className='font-serif text-right'>
        {`${createdAt.toDateString()} · ${author ? `${author.firstName} ${author.lastName}` : authorId}`}
      </div>
      <div className='relative w-full h-fit flex justify-center'>
        <Image src={thumbnail.url} alt={thumbnail.alt} width={200} height={200} className='w-3/4 h-full'></Image>
      </div>
      <div className='px-6'>
        <article className='prose lg:prose-xl' dangerouslySetInnerHTML={{ __html: parsedContent }} />
      </div>
      {/* <Suspense fallback={<ViewCountSkeleton />}>
        <ViewCount id={id} />
      </Suspense> */}
      <ViewCount id={id} />
    </div>
  )
}

export default BlogDetail