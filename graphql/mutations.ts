import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login (username: $username, password: $password) {
            user {
                username
                name
                role
                slug
            }
            token
        }
    }
`

// TAGS
export const ADD_TAG = gql`
    mutation CreateTag($label: String!) {
        createTag(label: $label) {
            slug
            label
            active
        }
    }
`

export const UPDATE_TAG = gql`
    mutation UpdateTag($slug: String!, $label: String!, $active: Boolean!) {
        updateTag(slug: $slug, label: $label, active: $active) {
            slug
            label
            active
        }
    }
`

export const REMOVE_TAG = gql`
    mutation RemoveTag($slug: String!) {
        removeTag(slug: $slug)
    }
`

export const ACTIVATE_TAG = gql`
    mutation UpdateTag($slug: String!, $active: Boolean!) {
        updateTag(slug: $slug, active: $active) {
            active
        }
    }
`

// AUTHORS || USER
export const ADD_USER = gql`
    mutation Register($username: String!, $password: String!, $name: String!, $role: String!) {
        register(username: $username, password: $password, name: $name, role: $role) {
            username
            role
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($username: String!, $name: String, $password: String, $role: String, $active: Boolean) {
        updateUser(username: $username, name: $name, password: $password, role: $role, active: $active) {
            username
        }
    }
`

export const REMOVE_USER = gql`
    mutation RemoveUser($username: String!) {
        removeUser(username: $username)
    }
`

// ARTICLES
export const ADD_ARTICLE = gql`
    mutation CreateArticle($title: String!, $content: String!, $tags: [String!]!) {
        createArticle(title: $title, content: $content, tags: $tags) {
            slug
        }
    }
`

export const UPDATE_ARTICLE = gql`
    mutation UpdateArticle($slug: String!, $title: String, $content: String, $tags: [String!]) {
        updateArticle(slug: $slug, title: $title, content: $content, tags: $tags) {
            slug
        }
    }
`

export const REMOVE_ARTICLE = gql`
    mutation RemoveArticle($slug: String!) {
        removeArticle(slug: $slug)
    }
`