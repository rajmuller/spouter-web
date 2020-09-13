import { ChakraProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import theme from "../theme";
import { Layout } from "../components";
import { useApollo } from "../graphql/createApollo";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Layout />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
