import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { _getToken, _getUser, _removeToken } from "./Cookie";
import { parseCookie } from "./Helpers";

/**
 * Check if the user already logged in or not
 * @param context context from Next getServerSideProps
 */
export const checkAuth = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const token = process.browser ? _getToken() : context.req.headers.cookie ? parseCookie(context.req.headers.cookie)._token : ''

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    })

    if (res.status !== 200) {
        _removeToken()
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
    }
}

/**
 * Check if user role matches the authorized roles to access the page
 * @param context context from Next getServerSideProps
 * @param roles array of roles that authorized to access the page
 */
export const checkRole = async (context: GetServerSidePropsContext<ParsedUrlQuery>, roles: string[]) => {
    const user = process.browser ? _getUser() : context.req.headers.cookie ? JSON.parse(parseCookie(context.req.headers.cookie)._user) : null

    if (!roles.includes(user?.role)) {
        context.res.writeHead(302, { Location: '/' })
        context.res.end()
    }
}