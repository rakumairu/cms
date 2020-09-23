import Cookie from 'js-cookie'
import { IUser } from './interfaces'

export const _storeLoginInfo = (token: string, user: IUser) => {
    Cookie.set('_token', token)
    Cookie.set('_user', user)
    return true
}

export const _getToken = () => {
    return Cookie.get('_token')
}

export const _removeToken = () => {
    return Cookie.remove('_token')
}