import { ChakraProvider } from "@chakra-ui/core";
import { createClient, Provider } from "urql";
import { AppProps } from "next/app";

import theme from "../theme";
import { Layout } from "../components";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
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
