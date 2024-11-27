import { Session } from 'next-auth'
import { signOut } from '@/auth'
import { UserCircleIcon } from "@heroicons/react/24/solid";

type Props = {
    session: Session
}

const AccountSection = ({ session }: Props) => {
    return (
        <>
            <UserCircleIcon width={50} className='dark:text-white'></UserCircleIcon>
            <form className="" action={async () => { 'use server'; await signOut({ redirectTo: '/' }); }}>
                <button className="button button-red">
                    Log Out
                </button>
            </form>
        </>
    )
}

export default AccountSection