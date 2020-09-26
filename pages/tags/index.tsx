import Main from "@/components/layout/Main"
import { useMutation, useQuery } from "@apollo/client";
import { ACTIVATE_TAG, ADD_TAG, REMOVE_TAG, UPDATE_TAG } from "graphql/mutations";
import { TAGS } from "graphql/queries";
import { useState } from "react";
import { _getToken } from '$/utils/Cookie'
import { GetServerSideProps } from "next";
import { checkAuth } from "$/utils/Auth";
import ModalContainer from "@/components/modals/ModalContainer";
import { validateData } from "$/utils/Helpers";
import { IErrors } from "$/utils/interfaces";

const Tags = () => {
    const [state, setState] = useState({
        label: ''
    })

    const [editState, setEditState] = useState({
        slug: '',
        label: '',
        active: false
    })

    const [errors, setErrors] = useState<IErrors>({})

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)

    const { loading: tagLoading, error: tagError, data: tags, refetch: refetchTags } = useQuery(TAGS)

    const [addTagQL, { loading: isAddLoading }] = useMutation(ADD_TAG, {
        variables: {
            label: state.label
        },
        onCompleted: () => {
            refetchTags()
            setIsAddOpen(false)
        },
        onError: error => {
            alert(error.message)
        }
    })

    const addTag = () => {
        if (state.label !== '') {
            addTagQL()
        }
    }
    
    const [updateTagQL, { loading: isUpdateLoading }] = useMutation(UPDATE_TAG, {
        variables: {
            ...editState
        },
        onCompleted: () => {
            refetchTags()
            setIsEditOpen(false)
        },
        onError: error => {
            alert(error.message)
        }
    })

    const updateTag = () => {
        const { isValid, errors } = validateData(editState, ['active'])
        if (isValid) {
            updateTagQL()
        } else {
            alert('please check your data again')
        }
    }

    const [removeTagQL] = useMutation(REMOVE_TAG, {
        onCompleted: () => {
            refetchTags()
        }
    })

    const removeTag = (slug: string) => {
        removeTagQL({variables: {
            slug
        }})
    }

    const [activateTagQL] = useMutation(ACTIVATE_TAG, {
        onCompleted: () => {
            refetchTags()
        }
    })

    const activateTag = (slug: string) => {
        activateTagQL({variables: {
            slug,
            active: true
        }})
    }

    const editTag = (slug: string) => {
        const editData = tags.tags.filter(tag => tag.slug === slug) || []
        if (editData && editData.length > 0) {
            setEditState(prev => ({
                ...prev,
                active: editData[0].active,
                slug: editData[0].slug,
                label: editData[0].label,
            }))

            setIsEditOpen(true)
        } else {
            alert('cannot find the data')
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        const dataType = e.target.dataset.type || null

        switch (dataType) {
            case 'edit':
                setEditState(prev => ({
                    ...prev,
                    [name]: value
                }))
                break
            default:
                setState(prev => ({
                    ...prev,
                    [name]: value
                }))
        }
    }

    return (
        <Main>
            <ModalContainer
                isOpen={isEditOpen}
                close={() => setIsEditOpen(false)}
            >
                <div className="flex flex-col">
                    <input type="text" data-type="edit" name="label" value={editState.label} onChange={onChange} />
                    <input type="checkbox" data-type="edit" name="active" checked={editState.active} onChange={onChange} />
                    <button disabled={isUpdateLoading} onClick={() => updateTag()}>save</button>
                </div>
            </ModalContainer>
            <ModalContainer
                isOpen={isAddOpen}
                close={() => setIsAddOpen(false)}
            >
                <div className="flex flex-col">
                    <input type="text" name="label" value={state.label} onChange={onChange} />
                    <button disabled={isAddLoading} onClick={() => addTag()}>Create</button>
                </div>
            </ModalContainer>
            <div>
                <p>Tags</p>
                <button onClick={() => setIsAddOpen(true)}>create new tag</button>
            </div>
            <div className="flex flex-col">
                {
                    tagLoading ?
                    <p>... loading</p>
                    :
                    <div>
                        { tags?.tags?.map(tag => (
                            <div key={tag.id} className="flex items-center space-x-4 > *">
                                <p>{ tag.id }</p>
                                <p>{ tag.slug }</p>
                                <p>{ tag.label }</p>
                                <p>{ tag.active ? 'active' : 'non active' }</p>
                                <button onClick={() => editTag(tag.slug)}>edit</button>
                                {
                                    tag.active ?
                                    <button onClick={() => removeTag(tag.slug)}>deactivate</button>
                                    :
                                    <button onClick={() => activateTag(tag.slug)}>activate</button>
                                }
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

    return {
        props: {}
    }
}

export default Tags