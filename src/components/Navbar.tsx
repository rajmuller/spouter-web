import { FC } from "react";
import NextLink from "next/link";
import { Link, Flex, Box, Button } from "@chakra-ui/core";
import { useApolloClient } from "@apollo/client";

import { useLogoutMutation, useMeQuery } from "../graphql/generated";

const Navbar: FC = () => {
  const { data, loading: loadingMe } = useMeQuery();
  const [logout, { loading: loadingLogout }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  if (loadingMe) {
    return null;
  }

  if (!data?.me) {
    return (
      <>
        <NextLink href="/">
          <Link>home</Link>
        </NextLink>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex>
      <Box as="span" mr={2}>
        Hi {data.me.username}
      </Box>
      <Button
        isLoading={loadingLogout}
        onClick={async () => {
          await logout();
          await apolloClient.resetStore();
        }}
        variant="link"
      >
        logout
      </Button>
    </Flex>
  );
};

export default Navbar;
