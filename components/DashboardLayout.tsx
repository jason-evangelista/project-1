import { FC, PropsWithChildren } from "react";
import { Container } from "@mantine/core";

import NavBar from "./Navbar";
import { User } from "@supabase/auth-helpers-nextjs";

type Props = PropsWithChildren & {
  user: User;
};

const DashBoardLayout: FC<Props> = (props) => {
  const { user, children } = props;
  if (!user) return null;
  return (
    <>
      <NavBar name={user.email || ""} />
      <Container>{children}</Container>
    </>
  );
};

export default DashBoardLayout;
