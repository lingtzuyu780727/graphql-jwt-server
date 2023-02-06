import JWT from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
const jwtSecrect: string = process.env.TOKEN_SECRET!;

export const verifyAccountFromToken = async (
  token: string,
): Promise<{ account: string } | null> => {
  try {
    const verifiedAccount = await JWT.verify(token, jwtSecrect);
    return verifiedAccount as { account: string };
  } catch (err) {
    return null;
  }
};
