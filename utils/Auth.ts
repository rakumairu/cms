import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { _getToken, _removeToken } from "./Cookie";
import { parseCookie } from "./Helpers";

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