import { Command } from "commander";
import * as fs from "fs";
import open from "open";
import * as os from "os";
import * as path from "path";
import { consola } from "consola";
import keytar from "keytar";

export const ACCOUNTS_PATH = path.join(os.homedir(), ".nlx-cli-auth.json");

async function saveTokens(account: string, tokenData: any) {
  await keytar.setPassword("nlx-cli", account, JSON.stringify(tokenData));
}

async function loadTokens(): Promise<[string, any]> {
  try {
    const data = fs.readFileSync(ACCOUNTS_PATH, "utf8");
    const accounts = JSON.parse(data);
    if (accounts.currentAccount) {
      const res = await keytar.getPassword("nlx-cli", accounts.currentAccount);
      if (res) return [accounts.currentAccount, JSON.parse(res)];
    }
    throw new Error("No tokens found for current account");
  } catch {
    throw new Error("Failed to load tokens");
  }
}

async function refreshTokenIfNeeded() {
  let account, tokens;
  try {
    [account, tokens] = await loadTokens();
  } catch (error) {
    consola.error("Error loading tokens");
    return null;
  }
  if (!tokens || !tokens.refresh_token) return null;
  // Check expiry
  const now = Math.floor(Date.now() / 1000);
  if (
    tokens.expires_in &&
    tokens.obtained_at &&
    now < tokens.obtained_at + tokens.expires_in - 60
  ) {
    consola.debug("Access token is still valid.");
    return tokens.access_token;
  }
  consola.debug("Access token is expired or invalid. Refreshing...");
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
    await saveTokens(account, newTokens);
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
    consola.box(
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
        consola.error("Error:", resData.error_description || resData.error);
        return;
      }
    }

    // Step 3: Fetch user object

    let accounts = { currentAccount: null, accounts: [] };

    if (fs.existsSync(ACCOUNTS_PATH)) {
      const data = fs.readFileSync(ACCOUNTS_PATH, "utf8");
      accounts = JSON.parse(data);
    }

    const userRes = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const userData: any = await userRes.json();

    if (!accounts.currentAccount) {
      await fs.promises.writeFile(
        ACCOUNTS_PATH,
        JSON.stringify({
          currentAccount: userData.email,
          accounts: [userData.email],
        }),
      );
    } else if (accounts.currentAccount !== userData.email) {
      accounts.currentAccount = userData.email;
      await fs.promises.writeFile(
        ACCOUNTS_PATH,
        JSON.stringify({
          currentAccount: userData.email,
          accounts: [userData.email, ...accounts.accounts],
        }),
      );
    }

    // Step 4: Store token securely
    tokenData.obtained_at = Math.floor(Date.now() / 1000);
    await saveTokens(userData.email, tokenData);
    consola.success("Login successful! Access token stored securely.");
  });

// Example usage: get a valid access token

export async function ensureToken(): Promise<string> {
  const accessToken = await refreshTokenIfNeeded();
  if (!accessToken) {
    consola.error("Not authenticated. Please run 'login' first.");
    process.exit(1);
  }
  return accessToken;
}
