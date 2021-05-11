import crypto from "crypto";
import fetch from "node-fetch";
import { v4 } from "uuid";
import {
  // GITHUB_CLIENT_ID,
  // GITHUB_CLIENT_SECRET,
  // GITHUB_CALLBACK,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  TWITTER_CALLBACK,
} from "./constants";

function fixedEncodeURIComponent(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}

async function main() {
  const method = "POST";
  const baseURL = "https://api.twitter.com/oauth/request_token";

  let params: any = {
    oauth_callback: TWITTER_CALLBACK,
    oauth_consumer_key: TWITTER_CLIENT_ID,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_nonce: v4(),
    oauth_version: "1.0",
  };

  const paramString = Object.entries(params)
    .map(([k, v]: [any, any]) => [
      fixedEncodeURIComponent(k),
      fixedEncodeURIComponent(v),
    ])
    .sort()
    .map((entry) => entry.join("="))
    .join("&");

  const baseString = `${method}&${fixedEncodeURIComponent(
    baseURL
  )}&${fixedEncodeURIComponent(paramString)}`;

  const signingKey = `${fixedEncodeURIComponent(TWITTER_CLIENT_SECRET)}&`;

  const signature = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  const signedParams = {
    ...params,
    ["oauth_signature"]: fixedEncodeURIComponent(signature),
  };

  const response = await fetch(baseURL, {
    headers: {
      Authorization: `OAuth ${signedParams}`,
    },
  });

  const json = await response.json();

  console.log(json);
}

main().catch((error) => console.error(error));

// https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
// https://developer.twitter.com/en/docs/authentication/oauth-1-0a/percent-encoding-parameters
