export interface IMeta {
    title?: string
    description?: string
    url?: string
    image?: string
}

export interface IUser {
    username: string
    name: string
    role: 'admin' | 'author' | 'reader'
    slug: string
}

export interface IErrors {
    [key: string]: string
}