import { getBlogBySlug } from '@/app/api/blog/route'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import markdownit from 'markdown-it'
import ViewCount from './ViewCount'
import { getOneUser } from '@/app/api/user/route'
import { parseDatetime } from '@/utils/GeneralUtils'
import CommentForm from '@/app/components/CommentForm'
import CommentList from '@/app/components/Comment'
import { PostUrl } from '@/app/models/Comment'
import { getCommentOfBlog } from '@/app/actions/comment'

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
  const { id, title, content, categories, createdAt, thumbnail, thumbnailAlt, authorId } = blog
  const commentPage = await getCommentOfBlog(id, slug)
  const { content: comments } = commentPage
  const author = await getOneUser(authorId, `/blog/${slug}`)

  const parsedContent = md.render(content)
  return (
    <div className="flex flex-col gap-6 justify-center w-[60vw]">
      <div className='text-4xl font-bold'>
        {title}
      </div>
      <div className='font-serif text-right'>
        {`${parseDatetime(createdAt)} · ${author ? `${author.firstName} ${author.lastName}` : ""}`}
      </div>
      <div className='relative w-full h-fit flex justify-center'>
        {
          thumbnail ?
            <Image src={thumbnail} alt={thumbnailAlt || ""} width={200} height={200} className='w-3/4 h-full'></Image>
            : ""
        }
      </div>
      <div className='px-6 text-base'>
        <article className='prose lg:prose-xl max-w-full' dangerouslySetInnerHTML={{ __html: parsedContent }} />
      </div>
      <hr />
      <CommentForm postUrl={`${PostUrl.BLOG}/${id}`} callbackUrl={`/blog/${slug}`} />
      <CommentList comments={comments} />
      <ViewCount id={id} />
    </div>
  )
}

export default BlogDetail