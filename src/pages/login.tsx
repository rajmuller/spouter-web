import { FC } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { useRouter } from "next/router";
import { Container, InputField } from "../components";
import { useLoginMutation } from "../generated/graphql";
import { mapError } from "../util";

export const Login: FC = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Container variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({ data: values });
          console.log("res: ", res);
          if (res.data?.login.errors) {
            setErrors(mapError(res.data.login.errors));
          } else if (res.data?.login.user) {
            await router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              type="text"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              variantColor="teal"
              mt={1}
              isLoading={isSubmitting}
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
