import React from 'react'
import UserSelect from './SelectAssignee'

type Props = {
    user_id: string
}

const InputSection = ({ user_id }: Props) => {
    return (
        <>
            <input type="hidden" id="user_id" name="user_id" defaultValue={user_id} />
            <div className="mb-[15px]">
                <label className="" htmlFor="summary">Summary:</label>
                <input type="text" className="input w-full !rounded-tl-none  " id="summary" name="summary"  />
            </div>
            <div className="mb-[15px]">
                <label className="" htmlFor="description">Description:</label>
                <textarea className="input w-full !rounded-tl-none " id="description" name="description" rows={4} />
            </div>
            <div className="mb-[15px]">
                <label className="" htmlFor="dueDate">Due Date:</label>
                <input type="datetime-local"  className="input hover:cursor-pointer ml-3 " id="dueDate" name="dueDate" />
            </div>
        </>
    )
}

export default InputSection