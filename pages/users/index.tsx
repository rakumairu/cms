import Main from "@/components/layout/Main"
import { useMutation, useQuery } from "@apollo/client";
import { ACTIVATE_TAG, ADD_USER, ADD_TAG, REMOVE_TAG, UPDATE_TAG, UPDATE_USER, REMOVE_USER } from "graphql/mutations";
import { USERS } from "graphql/queries";
import { useState } from "react";
import { _getToken } from '$/utils/Cookie'
import { GetServerSideProps } from "next";
import { checkAuth, checkRole } from "$/utils/Auth";
import ModalContainer from "@/components/modals/ModalContainer";
import { validateData } from "$/utils/Helpers";
import { IErrors } from "$/utils/interfaces";

const Users = () => {
    const [state, setState] = useState({
        username: '',
        password: '',
        name: '',
        role: '',
    })

    const [editState, setEditState] = useState({
        username: '',
        password: '',
        name: '',
        role: '',
        active: false,
    })

    const [errors, setErrors] = useState<IErrors>({})

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)

    const { loading: userLoading, error: userError, data: users, refetch: refetchUsers } = useQuery(USERS)

    const [addUserQL, { loading: isAddLoading }] = useMutation(ADD_USER, {
        variables: {
            ...state
        },
        onCompleted: () => {
            refetchUsers()
            setIsAddOpen(false)
        },
        onError: error => {
            alert(error.message)
        }
    })

    const addUser = () => {
        const { isValid, errors } = validateData(state)
        if (isValid) {
            addUserQL()
        } else {
            alert('please check your data gaain')
        }
    }
    
    const [updateUserQL, { loading: isUpdateLoading }] = useMutation(UPDATE_USER, {
        onCompleted: () => {
            refetchUsers()
            setIsEditOpen(false)
        },
        onError: error => {
            alert(error.message)
        }
    })

    const updateUser = () => {
        const { isValid, errors } = validateData(editState, ['active', 'password'])
        if (isValid) {
            updateUserQL({variables: {
                ...editState
            }})
        } else {
            alert('please check your data again')
        }
    }

    const activateUser = (username: string) => {
        updateUserQL({variables: {
            username,
            active: true
        }})
    }

    const [removeUserQL] = useMutation(REMOVE_USER, {
        onCompleted: () => {
            refetchUsers()
        }
    })

    const removeUser = (username: string) => {
        removeUserQL({variables: {
            username
        }})
    }

    const editUser = (username: string) => {
        const editData = users.users.filter(user => user.username === username) || []
        if (editData && editData.length > 0) {
            setEditState({
                username: editData[0].username,
                password: '',
                name: editData[0].name,
                role: editData[0].role,
                active: editData[0].active,
            })

            setIsEditOpen(true)
        } else {
            alert('cannot find the data')
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' && 'checked' in e.target ? e.target.checked : e.target.value
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
                    <input type="text" data-type="edit" name="name" value={editState.name} onChange={onChange} />
                    <input type="password" data-type="edit" name="password" value={editState.password} onChange={onChange} />
                    <select data-type="edit" name="role" value={editState.role} onChange={onChange}>
                        <option value="" disabled>-- please choose role --</option>
                        <option value="admin">Admin</option>
                        <option value="author">Author</option>
                        <option value="reader">Reader</option>
                    </select>
                    <input type="checkbox" data-type="edit" name="active" checked={editState.active} onChange={onChange} />
                    <button disabled={isUpdateLoading} onClick={() => updateUser()}>save</button>
                </div>
            </ModalContainer>
            <ModalContainer
                isOpen={isAddOpen}
                close={() => setIsAddOpen(false)}
            >
                <div className="flex flex-col">
                    <input type="text" name="username" value={state.username} onChange={onChange} />
                    <input type="text" name="name" value={state.name} onChange={onChange} />
                    <input type="password" name="password" value={state.password} onChange={onChange} />
                    <select name="role" value={state.role} onChange={onChange}>
                        <option value="" disabled>-- please choose role --</option>
                        <option value="admin">Admin</option>
                        <option value="author">Author</option>
                        <option value="reader">Reader</option>
                    </select>
                    <button disabled={isAddLoading} onClick={() => addUser()}>Create</button>
                </div>
            </ModalContainer>
            <div>
                <p>Users</p>
                <button onClick={() => setIsAddOpen(true)}>create new user</button>
            </div>
            <div className="flex flex-col">
                {
                    userLoading ?
                    <p>... loading</p>
                    :
                    <div>
                        { users?.users?.map(author => (
                            <div key={author.id} className="flex items-center space-x-4 > *">
                                <p>{ author.id }</p>
                                <p>{ author.username }</p>
                                <p>{ author.name }</p>
                                <p>{ author.slug }</p>
                                <p>{ author.role }</p>
                                <p>{ author.created }</p>
                                <p>{ author.active ? 'active' : 'non active' }</p>
                                <button onClick={() => editUser(author.username)}>edit</button>
                                {
                                    author.active ?
                                    <button onClick={() => removeUser(author.username)}>deactivate</button>
                                    :
                                    <button onClick={() => activateUser(author.username)}>activate</button>
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
    await checkRole(context, ['admin'])

    return {
        props: {}
    }
}

export default Users