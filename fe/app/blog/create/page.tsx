import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'
import CreateBlogForm from './CreateBlogForm';

type Props = {}

const CreateBlog = async (props: Props) => {
  const session = await auth();
  if (!session) {
    redirect("/blog")
  }
  return (
    <div className='w-3/4'>
      <CreateBlogForm />
    </div>
  )
}

export default CreateBlog