import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
  uri: "http://13.209.70.145/v1/graphql",
})

export default { client }