import { createClient, Session } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vwxurkamlskzzefdzuln.supabase.co",
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3eHVya2FtbHNrenplZmR6dWxuIiwicm9sZSI6InNlcnZpY2Vfcm
  sZSIsImlhdCI6MTY2NTg5OTY5NCwiZXhwIjoxOTgxNDc1Njk0fQ.1f1tDTNBx-dKUWw0To4HHJOLFj9S0ZQkRy3yeJWXu4A`
);

// eslint-disable-next-line prefer-const
let session: Session = {
  access_token: "",
  refresh_token: "",
  expires_in: 0,
  token_type: "",
  user: undefined,
};

export async function getUserSession({ user }) {
  if (!session[user]) {
    const { data } = await supabase.auth.signInWithPassword({
      email: `papi8261@gmail.com`,
      password: `password`,
    });

    session[user] = data.session;
  }

  return session[user];
}
