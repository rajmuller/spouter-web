import { FC } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { useRouter } from "next/router";
import { Container, InputField } from "../components";
import { MeDocument, MeQuery, useLoginMutation } from "../graphql/generated";
import { mapError } from "../util";

export const Login: FC = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const onSubmit = async (
    values: { username: string; password: string },
    { setErrors }: { setErrors: any }
  ) => {
    const res = await login({
      variables: { data: values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.login.user,
          },
        });
      },
    });
    console.log("res: ", res);
    if (res.data?.login.errors) {
      setErrors(mapError(res.data.login.errors));
    } else if (res.data?.login.user) {
      await router.push("/");
    }
  };

  return (
    <Container variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
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
