import { FC } from "react";
import { Box } from "@chakra-ui/core";

type ContainerProps = {
  variant?: "small" | "normal";
};

const Container: FC<ContainerProps> = ({ children, variant = "normal" }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "normal" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Container;
