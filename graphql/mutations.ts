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
    mutation UpdateTag($slug: String!, $label: String!, $active: Boolean) {
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