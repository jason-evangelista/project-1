import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import CreateFoodType from "@components/page-component/dashboard/create-food/type/create-food";
import prisma from "@prisma/prisma-client";
import supabaseSecretRole from "@utils/supabaseSecretRole";

const createFood = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") {
    const { title, description, coverPhoto, isPublic, rate } =
      req.body as CreateFoodType;

    if (!session) return res.status(401).json({ message: "User not found" });

    const parseCoverPhoto = coverPhoto as unknown as string;
    const foodPublicImageUrl = await supabaseSecretRole.storage
      .from("food/food_cover_photo")
      .createSignedUrl(parseCoverPhoto, 240 * 3600);

    try {
      await prisma.food.create({
        data: {
          title,
          description,
          cover_photo: foodPublicImageUrl.data?.signedUrl || "",
          isPublic,
          rate: Number(rate),
          user_id: session.user.id,
        },
      });
      return res.status(200).json({
        message: "Food successfuly published.",
        redirect: "/dashboard",
      });
    } catch (error) {
      console.log(error);
      return res.status(405).json({ message: "Something went wrong" });
    }
  } else {
    return res
      .status(405)
      .json({ message: "This request only accepts POST method" });
  }
};

export default createFood;
