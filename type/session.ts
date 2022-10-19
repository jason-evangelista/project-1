import { Session } from "@supabase/auth-helpers-react";
type SessionReturn =
  | {
      session: Session;
    }
  | {
      session: null;
    };

export default SessionReturn;
