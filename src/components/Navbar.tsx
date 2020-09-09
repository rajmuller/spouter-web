import { FC } from "react";
import NextLink from "next/link";
import { Link, Flex, Box, Button } from "@chakra-ui/core";

import { useMeQuery } from "../generated/graphql";

const Navbar: FC = () => {
  const [{ data, fetching }] = useMeQuery();

  if (fetching) {
    return null;
  }

  if (!data?.me) {
    return (
      <>
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
      <Button variant="link">logout</Button>
    </Flex>
  );
};

export default Navbar;
