import { FC } from "react";

import { Flex } from "@chakra-ui/core";
import Navbar from "./Navbar";

const Layout: FC = () => {
  return (
    <Flex justify="flex-end" bg="teal.600" p={4} minH="header">
      <Navbar />
    </Flex>
  );
};

export default Layout;
