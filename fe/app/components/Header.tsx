import Link from 'next/link'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth';
import DarkThemeToggle from './DarkThemeToggle';
import { Navbar } from './Navbar';
import SignIn from './SignIn';
import AccountSection from './AccountSection';
import "@/public/css/header.css";

type Props = {}

const Header = async (props: Props) => {
    const session = await auth();

    return (
        <SessionProvider>
            <header>
                <div className="header">
                    <div className="logo-section ">
                        <img src={"../favicon.ico"} alt={"TaskMane Logo"} width={50} height={50} />
                        <Link href={'/'} className="home-link">
                            TaskMane
                        </Link>
                    </div>
                    <div className="navbar-section ">
                        <Navbar></Navbar>
                    </div>
                    <div className="auth-section ">
                        {session ? <AccountSection session={session}></AccountSection> : <SignIn />}
                        <DarkThemeToggle />
                    </div>
                </div>
            </header>
        </SessionProvider>
    )
}

export default Header