import { Command } from "commander";
import fs from "fs";
import open from "open";
import os from "os";
import path from "path";

const TOKEN_PATH = path.join(os.homedir(), ".nlx-cli-auth.json");

function saveTokens(tokenData: any) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2), {
    mode: 0o600,
  });
}

function loadTokens(): any | null {
  try {
    const data = fs.readFileSync(TOKEN_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function refreshTokenIfNeeded() {
  const tokens = loadTokens();
  if (!tokens || !tokens.refresh_token) return null;
  // Check expiry
  const now = Math.floor(Date.now() / 1000);
  if (
    tokens.expires_in &&
    tokens.obtained_at &&
    now < tokens.obtained_at + tokens.expires_in - 60
  ) {
    return tokens.access_token;
  }
  // Refresh
  const res = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      refresh_token: tokens.refresh_token,
    }),
  });
  const newTokens: any = await res.json();
  if (newTokens.access_token) {
    newTokens.refresh_token = newTokens.refresh_token || tokens.refresh_token;
    newTokens.obtained_at = now;
    saveTokens(newTokens);
    return newTokens.access_token;
  }
  return null;
}

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || "nlxdev.us.auth0.com"; // e.g. 'dev-xxxxxx.us.auth0.com'
const CLIENT_ID =
  process.env.AUTH0_CLIENT_ID || "A0qluq7wJQjFjMLle9pvrWWaVHM1QHE3";
const AUDIENCE =
  process.env.AUTH0_AUDIENCE || "https://nlxdev.us.auth0.com/api/v2/";

export const loginCommand = new Command("login")
  .description("Authenticate with NLX")
  .action(async () => {
    // Step 1: Start device flow
    const deviceCodeRes = await fetch(
      `https://${AUTH0_DOMAIN}/oauth/device/code`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          scope: "openid profile email offline_access",
          audience: AUDIENCE,
        }),
      },
    );
    const deviceCodeData: any = await deviceCodeRes.json();

    open(deviceCodeData.verification_uri_complete);
    console.log(
      `Please visit ${deviceCodeData.verification_uri_complete} and enter code: ${deviceCodeData.user_code}`,
    );

    // Step 2: Poll for token
    let tokenData;
    while (!tokenData) {
      await new Promise((r) => setTimeout(r, deviceCodeData.interval * 1000));
      const tokenRes = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          device_code: deviceCodeData.device_code,
          client_id: CLIENT_ID,
        }),
      });
      const resData: any = await tokenRes.json();
      if (resData.access_token) {
        tokenData = resData;
      } else if (resData.error !== "authorization_pending") {
        console.error("Error:", resData.error_description || resData.error);
        return;
      }
    }

    // Step 3: Store token securely
    tokenData.obtained_at = Math.floor(Date.now() / 1000);
    saveTokens(tokenData);
    console.log("Login successful! Access token stored securely.");
  });

// Example usage: get a valid access token

export async function getAccessToken(): Promise<string | null> {
  return await refreshTokenIfNeeded();
}
