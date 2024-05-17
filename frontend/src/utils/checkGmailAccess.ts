// utils/checkGmailAccess.ts

import axios from "@/axios";

export interface Tokens {
  refresh_token: string;
  client_id: string;
  client_secret: string;
}

const checkGmailAccess = async (tokens: Tokens): Promise<boolean> => {
  try {
    const response = await axios.post("/check-permissions", {
      refresh_token: tokens.refresh_token,
      client_id: tokens.client_id,
      client_secret: tokens.client_secret,
    });
    return response.data.status === "authorized";
  } catch (error) {
    console.error("Error checking Gmail access:", error);
    return false;
  }
};

export default checkGmailAccess;
