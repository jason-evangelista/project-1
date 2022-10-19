import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import CreateFoodType from "@components/page-component/dashboard/create-food/type/create-food";
import prisma from "@prisma/prisma-client";
import supabase from "@utils/supabase";

const createFood = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ message: "This request only accepts POST method" });

  const { title, description, coverPhoto, isPublic, rate } =
    req.body as CreateFoodType;

  const parseCoverPhoto = coverPhoto as unknown as string;
  const foodPublicImageUrl = await supabase.storage
    .from("food/food_cover_photo")
    .createSignedUrl(parseCoverPhoto, 240 * 3600);

  if (!session || !session.user?.email)
    return res.status(401).json({ message: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });

  if (!user) return res.status(401).json({ message: "User not found" });

  await prisma.food.create({
    data: {
      title,
      description,
      cover_photo: foodPublicImageUrl.data?.signedUrl || "",
      isPublic,
      rate: Number(rate),
      user_id: user.id,
    },
  });

  return res.status(200).json({ message: "Food successfuly published." });
};

export default createFood;
