import { checkAuth, checkRole } from "$/utils/Auth"
import { validateData } from "$/utils/Helpers"
import { IErrors } from "$/utils/interfaces"
import TextEditor from "@/components/forms/TextEditor"
import Main from "@/components/layout/Main"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_ARTICLE } from "graphql/mutations"
import { TAGS } from "graphql/queries"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const AddArticle = () => {
    const router = useRouter()
    
    const [state, setState] = useState({
        title: '',
        content: '',
        tags: [],
    })

    const [errors, setErrors] = useState<IErrors>({})

    const { data: tags } = useQuery(TAGS)
    
    const [addArticleQL, { loading: isAddLoading }] = useMutation(ADD_ARTICLE, {
        variables: {
            ...state,
            tags: state.tags.map(tag => tag.slug)
        },
        onCompleted: () => {
            router.push('/articles')
        },
        onError: error => {
            alert(error.message)
        }
    })

    const addArticle = () => {
        const { isValid, errors } = validateData(state)
        if (isValid) {
            addArticleQL()
        } else {
            alert('please check your data gaain')
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
                <button onClick={() => addArticle()}>Save</button>
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

export default AddArticle