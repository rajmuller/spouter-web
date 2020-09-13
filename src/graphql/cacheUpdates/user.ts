import { Data, Variables, Cache } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "../../util";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "../generated";

export const meAfterLogin = (_result: Data, _args: Variables, cache: Cache) => {
  betterUpdateQuery<LoginMutation, MeQuery>(
    cache,
    { query: MeDocument },
    _result,
    (result, query) => {
      if (result.login.errors) {
        return query;
      }
      return {
        me: result.login.user,
      };
    }
  );
};

export const meAfterLogout = (
  _result: Data,
  _args: Variables,
  cache: Cache
) => {
  betterUpdateQuery<LogoutMutation, MeQuery>(
    cache,
    { query: MeDocument },
    _result,
    () => {
      return {
        me: null,
      };
    }
  );
};
