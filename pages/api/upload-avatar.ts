import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import supabaseSecretRole from "@utils/supabaseSecretRole";
import prisma from "@prisma/prisma-client";

type BodyRequest = {
  path: string;
};

const uploadAvatar = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method !== "POST")
    return res.status(405).json({ message: "This call is only for POST" });

  const { path } = req.body as BodyRequest;
  const getSignUrlImage = await supabaseSecretRole.storage
    .from("food/food_cover_photo")
    .createSignedUrl(path, 240 * 3600);

  try {
    await prisma.userProfile.update({
      where: { id: session.user.id },
      data: {
        avatar_img: getSignUrlImage.data?.signedUrl,
      },
    });
    return res.status(200).json({ message: "Avatar successfully upload" });
  } catch (e) {
    console.error(e);
    return res.status(405).json({ message: "Something went wrong" });
  }
};

export default uploadAvatar;
