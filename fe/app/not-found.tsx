import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen  text-white">
            <h2 className="text-4xl font-extrabold mb-4">Page Not Found</h2>
            <p className="text-lg text-black mb-6">Sorry, we couldn't find the page you're looking for.</p>
            <Link href="/" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75">
                Return Home
            </Link>
        </div>

    )
}