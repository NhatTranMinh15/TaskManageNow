import { signOut } from '@/auth'
import { UserCircleIcon } from "@heroicons/react/24/solid";

type Props = {
}

const AccountSection = ({ }: Props) => {
    return (
        <div className='relative' id='user-icon'>
            <UserCircleIcon width={50} className='dark:text-white hover:cursor-pointer' />
            <div className='account-dropdown'>
                <div className="account-dropdown-inner mt-3">
                    <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }); }} className='w-full'>
                        <button className="button button-red w-full">
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountSection