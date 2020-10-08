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
    const res = await register({
      variables: { data: values },
    });
    console.log("res: ", res);
    if (res.data?.register.errors) {
      setErrors(mapError(res.data.register.errors));
    } else if (res.data?.register.user) {
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
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              type="text"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="text"
              />
            </Box>
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
