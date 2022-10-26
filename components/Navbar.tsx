import { FC } from "react";
import {
  Avatar,
  Button,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import Notify from "@api/notify";
import { useSessionContext } from "@supabase/auth-helpers-react";

type Props = {
  name: string;
};

const NavBar: FC<Props> = (props) => {
  const { name = "Jason Evangelista" } = props;
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const handleOnSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) return Notify(error.message, null, "error");
    router.replace("/auth/sign-in");
    return;
  };

  return (
    <Container
      my="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Group>
        <h3>Food Blog</h3>
      </Group>
      <Group>
        <Button
          component={NextLink}
          href="/dashboard"
          variant="light"
          sx={{
            ":hover": {
              textDecoration: "none",
            },
          }}
        >
          Home
        </Button>
        <Button
          component={NextLink}
          href="/dashboard/create-food"
          variant="light"
          sx={{
            ":hover": {
              textDecoration: "none",
            },
          }}
        >
          Create Food
        </Button>
        <Menu>
          <Menu.Target>
            <UnstyledButton
              sx={{ display: "flex", alignItems: "center" }}
              name="profileDropDown"
            >
              <Avatar src={""} alt={""} radius="xl" size={30} />
              <Text size="sm" weight={600}>
                {name}
              </Text>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={NextLink} href="/dashboard/profile">
              Profile
            </Menu.Item>
            <Menu.Item name="signOutBtn" onClick={handleOnSignOut}>
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  );
};

export default NavBar;
