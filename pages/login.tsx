import { useMutation } from "@apollo/client"
import { useState } from "react"
import { LOGIN } from "graphql/mutations";
import { _getToken, _storeLoginInfo } from "$/utils/Cookie";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter()

    const [state, setState] = useState({
        username: '',
        password: '',
    })
    
    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            if (_storeLoginInfo(data.login.token, data.login.user)) {
                router.push('/')
            }
        },
        onError: (error) => {
            alert(error.message)
        }
    })

    const onChange = (e: React.ChangeEvent<{ name: string, value: string }>) => {
        const name = e.target.name
        const value = e.target.value

        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const sendLogin = () => {
        if (state.username !== '' && state.password !== '') {
            login({
                variables: {
                    username: state.username,
                    password: state.password
                }
            })
        }
    }

    return (
        <div>
            <input type="text" name="username" value={state.username} onChange={onChange} />
            <input type="password" name="password" value={state.password} onChange={onChange} />
            <button onClick={sendLogin}>Login</button>
        </div>
    )
}

export default Login