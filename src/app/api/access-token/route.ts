import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();

  const response = await client.users.getUserOauthAccessToken(userId, "github");

  const accessToken = response?.data?.[0]?.token;

  if (!accessToken) {
    return Response.json({ error: "Access token not found" }, { status: 404 });
  }

  return Response.json({ accessToken });
}
