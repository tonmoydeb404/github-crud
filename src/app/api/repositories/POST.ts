import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../helpers";

async function postFn(request: NextRequest) {
  try {
    const accessToken = await getAccessToken();

    const octokit = new Octokit({ auth: accessToken });

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Repository name is required" },
        { status: 400 }
      );
    }

    // GitHub API call to create the repo
    const response = await octokit.rest.repos.createForAuthenticatedUser({
      name,
      private: true,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("GitHub Repo Creation Error:", error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to create GitHub repository";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export default postFn;
