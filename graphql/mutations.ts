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
        }
    }
`

export const UPDATE_TAG = gql`
    mutation UpdateTag($slug: String!, $label: String!) {
        updateTag(slug: $slug, label: $label) {
            slug
            label
        }
    }
`