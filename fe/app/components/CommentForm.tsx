'use client'
import React, { useActionState } from 'react'
import { handleFormSubmit } from '../actions/comment'

type Props = {
    parentId?: string
    postUrl: string;
    callbackUrl?: string;
}

const CommentForm = ({ parentId, postUrl, callbackUrl }: Props) => {
    const [state, formAction, isPending] = useActionState((prevState: any, formData: FormData) => { return handleFormSubmit(prevState, formData, postUrl, callbackUrl) }, {})
    return (
        <form name="commentForm" id="commentForm" action={formAction} className='flex flex-col gap-3'>
            <input type="hidden" id="postUrl" name="postUrl" defaultValue={postUrl} />
            <input type="hidden" id="parentId" name="parentId" defaultValue={parentId} />
            <label className='block text-2xl font-bold' htmlFor="content">Leave a Comment</label>
            <textarea name="content" required id="content" className="input w-full max-h-24" placeholder="Your Comment" />
            <button type="submit" className="button button-primary w-fit">Send</button>
        </form>
    )
}

export default CommentForm