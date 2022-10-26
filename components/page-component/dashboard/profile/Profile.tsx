import {
  Avatar,
  Center,
  Stack,
  Text,
  Group,
  TextInput,
  Button,
  Divider,
} from "@mantine/core";
import { ApiQuota } from "@prisma/client";
import { User } from "@supabase/auth-helpers-nextjs";
import { FC, useState } from "react";
import axios from "axios";

type Props = {
  user: User;
  apiQuota: ApiQuota;
};

const Profile: FC<Props> = (props) => {
  const { user, apiQuota } = props;
  const [apiKey, setApiKey] = useState(apiQuota.apiKey || "");
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const isApiKeyEmpty = !apiKey.length;

  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true);
    const { data } = await axios.get("/api/generate-key");
    setApiKey(data.token);
    setIsGeneratingKey(false);
  };

  return (
    <Center mt="xl">
      <Stack>
        <Center>
          <Avatar size={130} radius="xl" />
        </Center>
        <Text weight={700} size="lg" align="center">
          {user.email}
        </Text>
        <Divider />
        <Group>
          <Text weight={600}>Api key:</Text>
          <TextInput
            size="xs"
            readOnly
            defaultValue={apiKey}
            variant="filled"
          />
        </Group>
        {isApiKeyEmpty && (
          <Button loading={isGeneratingKey} onClick={handleGenerateApiKey}>
            Generate Api Key
          </Button>
        )}
      </Stack>
    </Center>
  );
};

export default Profile;
