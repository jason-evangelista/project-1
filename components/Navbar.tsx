import {
  Avatar,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { signOut } from "next-auth/react";
import { FC } from "react";

type Props = {
  name: string;
};

const NavBar: FC<Props> = (props) => {
  const { name = "Jason Evangelista" } = props;

  const handleOnSignOut = async () => {
    await signOut();
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
        <Menu>
          <Menu.Target>
            <UnstyledButton sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={""} alt={""} radius="xl" size={30} />
              <Text size="sm" weight={600}>
                {name}
              </Text>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={handleOnSignOut}>Sign Out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  );
};

export default NavBar;