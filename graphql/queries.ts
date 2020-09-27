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
    query users($slug: String, $role: String) {
        users(slug: $slug, role: $role) {
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

export const ARTICLES = gql`
    query articles($slug: String, $tag_slug: String, $cursor: String, $limit: String, $sort: String, $asc: String, $search: String, $author_slug: String) {
        articles(slug: $slug, tag_slug: $tag_slug, cursor: $cursor, limit: $limit, sort: $sort, asc: $asc, search: $search, author_slug: $author_slug) {
            list {
                id
                title
                slug
                tags {
                    slug
                    label
                    active
                }
                author {
                    name
                }
                content
                created
                updated
            }
            cursor
            limit
            hasMore
        }
    }
`