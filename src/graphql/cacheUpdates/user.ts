import { ApolloCache } from "@apollo/client";
import { LoginMutation, MeDocument, MeQuery } from "../generated";

// eslint-disable-next-line import/prefer-default-export
export const meAfterLogin = (
  cache: ApolloCache<LoginMutation>,
  { data }: { data?: LoginMutation | null | undefined }
) => {
  cache.writeQuery<MeQuery>({
    query: MeDocument,
    data: {
      __typename: "Query",
      me: data?.login.user,
    },
  });
};
