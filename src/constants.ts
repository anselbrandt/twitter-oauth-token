import * as dotenv from "dotenv";
dotenv.config();

export const GITHUB_CLIENT_ID = process.env[
  "NEXT_PUBLIC_GITHUB_CLIENT_ID"
] as string;

export const GITHUB_CLIENT_SECRET = process.env[
  "NEXT_PUBLIC_GITHUB_CLIENT_SECRET"
] as string;

export const GITHUB_CALLBACK =
  process.env.NEXT_PUBLIC_GITHUB_CALLBACK ||
  "http://localhost:3000/api/auth/callback/github";

export const TWITTER_CLIENT_ID = process.env[
  "NEXT_PUBLIC_TWITTER_CLIENT_ID"
] as string;

export const TWITTER_CLIENT_SECRET = process.env[
  "NEXT_PUBLIC_TWITTER_CLIENT_SECRET"
] as string;

export const TWITTER_CALLBACK =
  process.env["NEXT_PUBLIC_TWITTER_CALLBACK"] ||
  "http://localhost:3000/api/auth/callback/twitter";
