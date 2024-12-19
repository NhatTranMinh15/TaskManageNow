import { Comment as CommentModel } from '@/app/models/Comment'
import { parseDatetime } from '@/utils/GeneralUtils';
import Image from 'next/image'
import Link from 'next/link';

type CommentProps = {
    comment: CommentModel;
}

type CommentListProps = {
    comments: CommentModel[];
}
const CommentList = ({ comments }: CommentListProps) => {
    return (
        <div className="my-6">
            <h3 className='text-xl'>{comments.length} Comments</h3>
            <ol className="p-4">
                {comments.map((comment, index) => (
                    <li key={`commentlist-${comment.id}`} className='pb-6'>
                        <Comment key={`commentlist-${comment.id}`} comment={comment} />
                    </li>
                ))}
            </ol>
        </div>
    )
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <div className='border-l border-dark-spring-green pl-[15px]'>
            <div className='flex items-center h-fit'>
                <Image src={`https://picsum.photos/200`} width="48" height="48" className=" rounded-full" alt="" />
                <div className="pl-[15px]">
                    <cite className='font-sans font-bold'>{`${comment.createdBy}`}</cite>
                    <div>
                        <time className='font-mono' dateTime={parseDatetime(comment.createdAt)}>
                            {`${parseDatetime(comment.createdAt)} · `}
                        </time>
                        <Link className="reply" href="#">Reply</Link>
                    </div>
                </div>
            </div>
            <p className='w-full min-h-[1.5vh] my-[1.5vh] text-lg'>{comment.content}</p>
            {comment.replies && comment.replies.map((reply) => (
                <ul key={`comment-${reply.id}`} className={"ml-12"}>
                    <Comment comment={reply} />
                </ul>
            ))}
        </div>
    )
}


export default CommentList