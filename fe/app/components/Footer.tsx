import Link from "next/link"

const link = "https://github.com/NhatTranMinh15/TaskManageNow/tree/main/fe"
function Footer() {
    return (
        <footer className="footer mt-[15px]">
            <div className="footer-content text-center dark:text-white-smoke">
                <span className=''>
                    &copy; {new Date().getFullYear() + " "}
                    <Link href={link} target="_blank">
                        NhatTranMinh15
                    </Link>
                    . All rights reserved.</span >
            </div>
        </footer>)
}

export default Footer