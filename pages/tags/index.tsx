import Main from "@/components/layout/Main"
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TAG, UPDATE_TAG } from "graphql/mutations";
import { TAGS } from "graphql/queries";
import { useState } from "react";
import { _getToken } from '$/utils/Cookie'
import { GetServerSideProps } from "next";
import { checkAuth } from "$/utils/Auth";

const Tags = () => {
    const [state, setState] = useState({
        label: ''
    })
    const { loading: tagLoading, error: tagError, data: tags, refetch: refetchTags } = useQuery(TAGS)

    const [addTagQL] = useMutation(ADD_TAG, {
        variables: {
            label: state.label
        },
        onCompleted: () => {
            refetchTags()
        }
    })

    const addTag = () => {
        if (state.label !== '') {
            addTagQL()
        }
    }
    
    const [updateTagQL] = useMutation(UPDATE_TAG)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Main>
            <div>
                <p>Tags</p>
                <input type="text" name="label" value={state.label} onChange={onChange} />
                <button onClick={() => addTag()}>add</button>
            </div>
            <div className="flex flex-col">
                {
                    tagLoading ?
                    <p>... loading</p>
                    :
                    <div>
                        { tags.tags?.map(tag => (
                            <div key={tag.id} className="flex items-center space-x-4 > *">
                                <p>{ tag.id }</p>
                                <p>{ tag.slug }</p>
                                <p>{ tag.label }</p>
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