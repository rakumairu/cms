import Cookie from 'js-cookie'
import { IUser } from './interfaces'

export const _storeLoginInfo = (token: string, user: IUser) => {
    Cookie.set('_token', token, { expires: 7 })
    Cookie.set('_user', user, { expires: 7 })
    return true
}

export const _getUser = () => {
    return Cookie.get('_user')
}

export const _getToken = () => {
    return Cookie.get('_token')
}

export const _removeToken = () => {
    return Cookie.remove('_token')
}