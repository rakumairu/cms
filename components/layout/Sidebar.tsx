import Link from 'next/link'

const Sidebar = () => {
    return (
        <div className="inset-0 absolute lg:relative w-full lg:w-1/5 bg-blue-500 transform translate-x-full lg:translate-x-0 flex flex-col text-white">
            <Link href="/tags">
                <p>Tags</p>
            </Link>
        </div>
    )
}

export default Sidebar