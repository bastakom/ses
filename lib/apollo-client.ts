import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    }
  }
});

export default client
