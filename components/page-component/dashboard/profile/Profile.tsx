import {
  Avatar,
  Center,
  Stack,
  Text,
  Group,
  TextInput,
  Button,
  Divider,
  FileButton,
} from "@mantine/core";
import { ApiQuota, UserProfile } from "@prisma/client";
import { User } from "@supabase/auth-helpers-nextjs";
import { FC, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import Notify from "@api/notify";

type Props = {
  user: User;
  apiQuota: ApiQuota;
  userProfile: UserProfile;
};

const Profile: FC<Props> = (props) => {
  const { apiQuota, userProfile } = props;
  const supabase = useSupabaseClient();
  const [avatarImage, setAvatarImage] = useState(userProfile.avatar_img);
  const [file, setFile] = useState<File | undefined>();
  const [apiKey, setApiKey] = useState(apiQuota.apiKey || "");
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const isApiKeyEmpty = !apiKey.length;

  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true);
    const { data } = await axios.get("/api/generate-key");
    setApiKey(data.token);
    setIsGeneratingKey(false);
  };

  const handleOnChangedAvatar = (file: File | null) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file || new Blob());

    fileReader.onload = async () => {
      if (file) {
        setAvatarImage(fileReader.result as string);
        setFile(file);
      }
    };
  };

  const handleOnAvatarSave = async () => {
    setIsUploadingAvatar(true);
    const { data, error } = await supabase.functions.invoke("compress-image", {
      body: file,
    });

    if (error)
      return Notify(
        "There is an error compressing the image, Please try again",
        null,
        "error"
      );

    await axios.post("/api/upload-avatar", { path: data.data.path as string });
    setIsUploadingAvatar(false);
    window.location.reload();
    setFile(undefined);
  };

  return (
    <Center mt="xl">
      <Stack>
        <Center>
          <Stack>
            <Avatar
              src={avatarImage}
              size={130}
              sx={{ border: "1px solid rgba(0,0,0,.3)", borderRadius: "100%" }}
            />
            <FileButton onChange={handleOnChangedAvatar} accept="image/jpeg">
              {(props) => (
                <Button size="xs" {...props}>
                  Upload image
                </Button>
              )}
            </FileButton>
            {file && (
              <Button
                onClick={handleOnAvatarSave}
                size="xs"
                color="green"
                loading={isUploadingAvatar}
              >
                Save Avatar
              </Button>
            )}
          </Stack>
        </Center>
        <Text weight={700} size="lg" align="center">
          {userProfile.name}
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
