import { ChakraProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";

import theme from "../theme";
import { Layout } from "../components";
import { MeDocument } from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => fn(result, data as any) as any
  );
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cacheExchange({
      updates: {
        Mutation: {
          login: () => {
            cache.updateQuery({ query: MeDocument }, (data) => {});
          },
        },
      },
    }),
    fetchExchange,
  ],
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Layout />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
