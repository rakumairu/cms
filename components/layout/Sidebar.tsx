import { _getUser, _removeToken } from '$/utils/Cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Sidebar = () => {
    const router = useRouter()
    const [role, setRole] = useState('')

    useEffect(() => {
        const user = JSON.parse(_getUser())
        setRole(user.role)
    }, [])

    const logout = () => {
        _removeToken()
        router.push('/login')
    }

    return (
        <div className="inset-0 absolute lg:relative w-full lg:w-1/5 bg-blue-500 transform translate-x-full lg:translate-x-0 flex flex-col text-white">
            <Link href="/tags">
                <p>Tags</p>
            </Link>
            {
                role === 'admin' &&
                <Link href="/users">
                    <p>Users</p>
                </Link>
            }
            {
                role === 'author' &&
                <>
                    <Link href="/articles">
                        <p>Articles</p>
                    </Link>
                    <Link href="/articles/add">
                        <p>Add Article</p>
                    </Link>
                </>
            }
            <p onClick={logout}>Logout</p>
        </div>
    )
}

export default Sidebar