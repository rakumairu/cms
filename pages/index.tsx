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

export default Home