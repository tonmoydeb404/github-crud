import { auth, clerkClient } from "@clerk/nextjs/server";

export const getAccessToken = async () => {
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

  return accessToken;
};
