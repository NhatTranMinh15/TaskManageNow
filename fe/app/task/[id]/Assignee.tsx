import { getOneUser } from '@/app/api/user/route'
import React from 'react'

type Props = {
  userId: string
}

const Assignee = async ({ userId }: Props) => {
  const user = await getOneUser(userId)
  return (
    <>{`${user.firstName} ${user.lastName}`}</>
  )
}

export default Assignee