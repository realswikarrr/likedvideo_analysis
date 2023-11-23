import { NextRequest } from "next/server";

const TOKEN = "connect.sid";

const checkUserLogin = async (req: any) => {
  const cookie = req.cookies[TOKEN];

  if (!cookie) {
    return false;
  }

  return;
};

export default checkUserLogin;
