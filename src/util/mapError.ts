import { FieldError } from "../graphql/generated";

const mapError = (errors: FieldError[]): Record<string, string> => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ fields, message }) => {
    fields.forEach((field) => {
      errorMap[field] = message;
    });
  });

  return errorMap;
};

export default mapError;
