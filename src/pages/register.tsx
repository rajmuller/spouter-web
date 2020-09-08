import { FC } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { Container, InputField } from "../components";
import { useRegisterMutation } from "../generated/graphql";
import { mapError } from "../util";

export const Register: FC = () => {
  const [, register] = useRegisterMutation();

  return (
    <Container variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register(values);
          if (res.data?.register.errors) {
            setErrors(mapError(res.data.register.errors));
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
