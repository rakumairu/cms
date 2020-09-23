import { checkAuth } from "$/utils/Auth"
import { GetServerSideProps } from "next"
import { useState } from "react"
import TextEditor from "../components/forms/TextEditor"
import Main from "../components/layout/Main"

const Home = () => {
    const [state, setState] = useState({
        test: ''
    })

    const onChange = (name, value) => {
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Main>
            <div>
                <p>Hello world</p>
            </div>
            <div>
                <TextEditor
                    value={state.test}
                    onChange={onChange}
                    name="test"
                />
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

export default Home