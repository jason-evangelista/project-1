import { Session } from "next-auth";
import { ParsedUrlQuery } from "querystring";

type SessionReturn = ParsedUrlQuery & {
  session: Promise<Session | null>;
};

export default SessionReturn;
