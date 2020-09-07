import { FC } from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";

export const Register: FC = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <FormControl>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input {...field} id="name" placeholder="name" />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
