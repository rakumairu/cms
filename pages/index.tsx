import { checkAuth } from "$/utils/Auth"
import { GetServerSideProps } from "next"
import Main from "../components/layout/Main"

const Home = () => {
    return (
        <Main>
            <div>
                <p>Hello world</p>
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