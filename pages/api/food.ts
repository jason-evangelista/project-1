import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma/prisma-client";
import jwt from "jsonwebtoken";
import { add } from "date-fns";

type DecodedKey = {
  user: string;
  email: string;
  iat: number;
};

const fetchFood = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const apiKey = req.headers.authorization;

    if (!apiKey)
      return res.status(401).json({ message: "You are not Authorized." });

    const decodedKey = jwt.decode(apiKey || "") as DecodedKey;

    const verifyUser = await prisma.userProfile.findUnique({
      where: { id: decodedKey.user },
    });

    jwt.verify(apiKey, verifyUser?.id || "", async (err) => {
      if (err) return res.status(401).json({ message: "Error Token" });
    });

    const checkApiQuota = await prisma.apiQuota.findUnique({
      where: { fromUser: verifyUser?.id },
    });

    if (!checkApiQuota)
      return res
        .status(401)
        .json({ message: "Error finding your api quota call" });

    const { apiCallLimit, apiCallCoolDown, apiResetLimitInTime } =
      checkApiQuota;

    if (
      apiResetLimitInTime &&
      new Date(Date.now()) > new Date(apiResetLimitInTime)
    ) {
      console.log("Reset the api call");
      await prisma.apiQuota.update({
        where: { fromUser: verifyUser?.id },
        data: {
          apiCallLimit: 20,
          apiResetLimitInTime: null,
        },
      });
    }

    if (!apiCallCoolDown)
      await prisma.apiQuota.update({
        where: {
          fromUser: verifyUser?.id,
        },
        data: {
          apiCallCoolDown: Date.now().toString(),
        },
      });

    const parseApiCallCooldown = (Date.now() - Number(apiCallCoolDown)) / 1000;

    if (apiCallLimit <= 0) {
      if (!apiResetLimitInTime)
        await prisma.apiQuota.update({
          where: { fromUser: verifyUser?.id },
          data: {
            apiResetLimitInTime: add(new Date(Date.now()), {
              hours: 23,
              minutes: 55,
            }),
          },
        });

      return res.status(401).json({
        message:
          "Your api call exceeds to 20, Please wait for 24-hours to fetch again",
      });
    }

    if (apiCallCoolDown && Date.now() - Number(apiCallCoolDown) < 60000) {
      return res.status(401).json({
        message: "Please wait for  1 minute to fire a call again",
        seconds: `${parseApiCallCooldown.toFixed(1)}s`,
      });
    }

    const foodList = await prisma.food.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        cover_photo: true,
        isPublic: true,
        rate: true,
        created_at: true,
        updated_at: true,
        user_id: false,
        User: {
          select: {
            name: true,
          },
        },
      },
    });

    await prisma.apiQuota.update({
      where: { fromUser: verifyUser?.id },
      data: {
        apiCallLimit: checkApiQuota.apiCallLimit - 1,
        apiCallCoolDown: Date.now().toString(),
      },
    });

    return res.status(200).json({ data: foodList });
  }
};

export default fetchFood;
