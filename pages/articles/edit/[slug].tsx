import dynamic from 'next/dynamic'
import { checkAuth, checkRole } from "$/utils/Auth"
import { validateData } from "$/utils/Helpers"
import Main from "@/components/layout/Main"
import { useMutation, useQuery } from "@apollo/client"
import { UPDATE_ARTICLE } from "graphql/mutations"
import { ARTICLES, TAGS } from "graphql/queries"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { IUser } from '$/utils/interfaces'

const TextEditor = dynamic(() => import("@/components/forms/TextEditor"))

interface IProps {
    slug: string
    user: IUser
}

const EditArticle = ({ slug, user }: IProps) => {
    const router = useRouter()
    
    const [state, setState] = useState({
        title: '',
        content: '',
        tags: [],
    })

    const { data: tags } = useQuery(TAGS)

    const {  } = useQuery(ARTICLES, {
        variables: {
            slug,
            author_slug: user.slug
        },
        onCompleted: data => {
            if (data?.articles?.list.length > 0) {
                const editData = data.articles.list[0]
    
                setState({
                    title: editData.title,
                    content: editData.content,
                    tags: editData.tags.map(tag => ({ label: tag.label, slug: tag.slug }))
                })
            } else {
                router.push('/articles')
            }
        }
    })
    
    const [updateArticlesQL, { loading: isUpdateLoading }] = useMutation(UPDATE_ARTICLE, {
        onCompleted: () => {
            router.push('/articles')
        },
        onError: error => {
            alert(error.message)
        }
    })

    const updateArticles = () => {
        const { isValid, errors } = validateData(state)
        if (isValid) {
            updateArticlesQL({variables: {
                ...state,
                slug,
                tags: state.tags.map(tag => tag.slug)
            }})
        } else {
            alert('please check your data again')
        }
    }
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' && 'checked' in e.target ? e.target.checked : e.target.value

        if (name === 'tags') {
            const index = 'selectedIndex' in e.target && e.target.selectedIndex
            const text = e.nativeEvent.target[index].text
            setState(prev => ({
                ...prev,
                tags: [...prev.tags, {
                    slug: value,
                    label: text
                }]
            }))
        } else {
            setState(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const contentChange = (name: string, value: string) => {
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Main>
            <div className="flex flex-col">
                <input type="text" name="title" value={state.title} onChange={onChange} />
                <TextEditor
                    value={state.content}
                    onChange={contentChange}
                    name="content"
                />
                <select name="tags" onChange={onChange} value="">
                    <option value="" disabled>-- please choose tag --</option>
                    {
                        tags?.tags?.filter(tag => !state.tags.map(tag => tag.slug).includes(tag.slug) && tag.active).map(tag => (
                            <option key={tag.slug} value={tag.slug}>{tag.label}</option>
                        ))
                    }
                </select>
                <div className="flex">
                    {
                        state.tags.map(tag => (
                            <p key={tag.slug}>{ tag.label }</p>
                        ))
                    }
                </div>
                <button onClick={() => updateArticles()}>Save</button>
            </div>
        </Main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await checkAuth(context)
    const user = await checkRole(context, ['author'])

    return {
        props: {
            slug: context.params.slug,
            user
        }
    }
}

export default EditArticle