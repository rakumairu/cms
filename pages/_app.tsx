import { useRouter } from 'next/router'
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error"
import { _getToken } from '$/utils/Cookie';
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL + '/api',
    })
    
    const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
        const token = _getToken()
        // return the headers to the context so httpLink can read them
        return {
            headers: {
            ...headers,
            authorization: token && (_.operationName !== 'Login') ? `Bearer ${token}` : "",
            }
        }
    })

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => {
                    if (message === 'Unauthorized') router.push('/login')
                }
            )
        }
    
        if (networkError) console.log(`[Network error]: ${networkError}`)
    })

    const client = new ApolloClient({
        link: ApolloLink.from([authLink, errorLink, httpLink]),
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
