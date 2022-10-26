import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@prisma/prisma-client";

const generateKey = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const { data } = await supabaseServer.auth.getUser();

  if (!data.user) return res.status(401).json({ message: "Unauthorized" });
  const { user } = data;

  const generateKey = jwt.sign(
    {
      user: user.id,
      email: user.email,
    },
    user.id
  );

  await prisma.apiQuota.update({
    where: { fromUser: user.id },
    data: {
      apiKey: generateKey,
    },
  });

  return res.status(200).json({ token: generateKey });
};

export default generateKey;
