import { FC } from "react";
import {
  Card,
  Image,
  Text,
  Center,
  Group,
  Title,
  Badge,
  Stack,
  Divider,
} from "@mantine/core";
import { format } from "date-fns";
import FoodListType from "../type/FoodListType";

type Props = {
  food: FoodListType[];
};

const FoodList: FC<Props> = (props) => {
  const { food } = props;
  if (!food.length)
    return (
      <Center>
        <Text weight={700} color="dimmed">
          You dont have any food article
        </Text>
      </Center>
    );
  return (
    <Stack spacing="md" mb="md">
      {food.map((item) => (
        <Card
          shadow="sm"
          radius="md"
          key={item.id}
          withBorder
          sx={{ maxWidth: "28rem" }}
        >
          <Card.Section>
            <Image src={item.cover_photo} alt={item.title} height={180} />
          </Card.Section>
          <Stack mt="sm" spacing="xs">
            <Title size={20}>{item.title}</Title>
            <Group position="left" spacing="xs">
              <Text size="sm" color="dimmed">
                Published By:
              </Text>
              <Text size="sm" color="red" weight={700}>
                {item.User.name}
              </Text>
            </Group>
            <Group position="left" spacing="xs">
              <Text size="sm" color="dimmed">
                Date Created:
              </Text>
              <Text size="sm" color="dimmed" weight={700}>
                {format(new Date(item.created_at), "EEE, MMMM dd, yyyy")}
              </Text>
            </Group>
            <Divider />
            <Text color="dimmed">{item.description}</Text>
            <Text color="orange" size="sm" weight={700}>
              Rate {item.rate} / 5
            </Text>
            <Group>
              <Badge color={item.isPublic ? "green" : "blue"}>
                {item.isPublic ? "Public Post" : "Private Post"}
              </Badge>
            </Group>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default FoodList;
