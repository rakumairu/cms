import { _removeToken } from '$/utils/Cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const router = useRouter()

    const logout = () => {
        _removeToken()
        router.push('/login')
    }

    return (
        <div className="inset-0 absolute lg:relative w-full lg:w-1/5 bg-blue-500 transform translate-x-full lg:translate-x-0 flex flex-col text-white">
            <Link href="/tags">
                <p>Tags</p>
            </Link>
            <Link href="/users">
                <p>Users</p>
            </Link>
            <p onClick={logout}>Logout</p>
        </div>
    )
}

export default Sidebar