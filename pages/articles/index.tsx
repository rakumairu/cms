import Main from "@/components/layout/Main"
import { useMutation, useQuery } from "@apollo/client";
import { ACTIVATE_TAG, ADD_USER, ADD_TAG, REMOVE_TAG, UPDATE_TAG, UPDATE_USER, REMOVE_USER, ADD_ARTICLE, UPDATE_ARTICLE, REMOVE_ARTICLE } from "graphql/mutations";
import { ARTICLES, USERS } from "graphql/queries";
import { useState } from "react";
import { _getToken } from '$/utils/Cookie'
import { GetServerSideProps } from "next";
import { checkAuth, checkRole } from "$/utils/Auth";
import ModalContainer from "@/components/modals/ModalContainer";
import { validateData } from "$/utils/Helpers";
import { IErrors } from "$/utils/interfaces";
import { useRouter } from "next/router";

const Articles = () => {
    const router = useRouter()

    const [editState, setEditState] = useState({
        slug: '',
        title: '',
        content: '',
        tags: [],
    })

    const [isEditOpen, setIsEditOpen] = useState(false)

    const { loading: articlesLoading, data: articles, refetch: refetchArticles } = useQuery(ARTICLES)

    const [removeArticlesQL] = useMutation(REMOVE_ARTICLE, {
        onCompleted: () => {
            refetchArticles()
        }
    })

    const removeArticles = (slug: string) => {
        removeArticlesQL({variables: {
            slug
        }})
    }

    return (
        <Main>
            <div>
                <p>Articles</p>
                <button onClick={() => router.push('/articles/add')}>create new article</button>
            </div>
            <div className="flex flex-col">
                {
                    articlesLoading ?
                    <p>... loading</p>
                    :
                    <div>
                        { articles?.articles?.list?.map(article => (
                            <div key={article.id} className="flex items-center space-x-4 > *">
                                <p>{ article.id }</p>
                                <p>{ article.title }</p>
                                <p>{ article.slug }</p>
                                <div className="flex flex-col">
                                    {
                                        article.tags.map(tag => (
                                            <p key={tag.label} className={`${tag.active ? 'text-black' : 'text-red-500'}`}>{tag.label}</p>
                                        ))
                                    }
                                </div>
                                <p>{ article.author.name }</p>
                                <p>{ article.created }</p>
                                <p>{ article.updated }</p>
                                <button onClick={() => router.push(`/articles/edit/${article.slug}`)}>edit</button>
                                <button onClick={() => removeArticles(article.slug)}>remove</button>
                            </div>
                        )) }
                    </div>
                }
            </div>
        </Main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await checkAuth(context)
    await checkRole(context, ['author'])

    return {
        props: {}
    }
}

export default Articles