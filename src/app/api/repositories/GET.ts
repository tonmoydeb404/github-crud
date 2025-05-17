import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../helpers";

async function getFn(request: NextRequest) {
  try {
    const accessToken = await getAccessToken();

    const octokit = new Octokit({
      auth: accessToken,
    });

    // Get query parameters for pagination
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const per_page = parseInt(searchParams.get("per_page") || "10", 10);

    const response = await octokit.rest.repos.listForAuthenticatedUser({
      page,
      per_page,
      sort: "updated",
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("GitHub Repo Fetch Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch GitHub repositories" },
      { status: 500 }
    );
  }
}

export default getFn;
