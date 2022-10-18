import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma/prisma-client";
import bcrypt from "bcrypt";
import SignUpBody from "@components/page-component/auth/sign-up/type/SignUpBody";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "This request only accepts POST method" });
  try {
    const { username, email, password } = req.body as SignUpBody;
    const checkUser = await prisma.user.findUnique({ where: { email } });

    if (checkUser)
      return res.status(503).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        user_name: username,
      },
    });
    return res.status(200).json({ message: "Successfully regsitered" });
  } catch (e) {
    console.log(e);
    return res
      .status(503)
      .json({ error: "Error registering your account, Please try again" });
  }
};

export default register;
