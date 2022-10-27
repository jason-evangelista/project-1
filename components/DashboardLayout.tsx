import { FC, PropsWithChildren } from "react";
import { Container } from "@mantine/core";

import NavBar from "./Navbar";
import { UserProfile } from "@prisma/client";

type Props = PropsWithChildren & {
  userProfile: UserProfile;
};

const DashBoardLayout: FC<Props> = (props) => {
  const { userProfile, children } = props;
  if (!userProfile) return null;
  return (
    <>
      <NavBar userProfile={userProfile} />
      <Container>{children}</Container>
    </>
  );
};

export default DashBoardLayout;
