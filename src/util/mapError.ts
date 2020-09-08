import { FieldError } from "../generated/graphql";

const mapError = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ fields, message }) => {
    fields.forEach((field) => {
      errorMap[field] = message;
    });
  });

  return errorMap;
};

export default mapError;
