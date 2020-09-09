import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
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
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="dark">
          <CSSReset />
          <Layout />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
