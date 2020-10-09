import { FC } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { useRouter } from "next/router";
import { Container, InputField } from "../components";
import { useRegisterMutation } from "../graphql/generated";
import { mapError } from "../util";

export const Register: FC = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  const onSubmit = async (
    values: { username: string; password: string; email: string },
    { setErrors }: { setErrors: any }
  ) => {
    const response = await register({
      variables: { data: values },
    });
    console.log("response: ", response);
    if (response.data?.register.errors) {
      setErrors(mapError(response.data.register.errors));
    } else if (response.data?.register.user) {
      await router.push("/");
    }
  };

  return (
    <Container variant="small">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={4}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                type="text"
              />
            </Box>
            <Box mb={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="text"
              />
            </Box>
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
