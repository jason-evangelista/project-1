import { Container } from "@mantine/core";
import { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";
import NavBar from "./Navbar";

type Props = PropsWithChildren & {
  session: Session;
};

const DashBoardLayout: FC<Props> = (props) => {
  const { session, children } = props;
  const { user } = session;
  return (
    <>
      <NavBar name={user?.name || ""} />
      <Container>{children}</Container>
    </>
  );
};

export default DashBoardLayout;
