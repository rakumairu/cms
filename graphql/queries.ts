import { gql } from "@apollo/client";

export const TAGS = gql`
    query {
        tags {
            id
            slug
            label
            active
        }
    }
`

export const USERS = gql`
    query userrs($slug: String, $role: String) {
        users (slug: $slug, role: $role) {
            id
            username
            name
            slug
            role
            created
            active
        }
    }
`