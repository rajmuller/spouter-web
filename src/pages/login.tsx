import { FC } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { useRouter } from "next/router";
import { Container, InputField } from "../components";
import { useLoginMutation } from "../graphql/generated";
import { meAfterLogin } from "../graphql/cacheUpdates";
import { mapError } from "../util";

export const Login: FC = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const onSubmit = async (
    values: { usernameOrEmail: string; password: string },
    { setErrors }: { setErrors: any }
  ) => {
    const response = await login({
      variables: values,
      update: meAfterLogin,
    });
    console.log("res: ", response);
    if (response.data?.login.errors) {
      setErrors(mapError(response.data.login.errors));
    } else if (response.data?.login.user) {
      await router.push("/");
    }
  };

  return (
    <Container variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
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
              colorScheme="teal"
              mt={4}
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
