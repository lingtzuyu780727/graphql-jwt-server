import JWT from 'jsonwebtoken';

export const verifyAccountFromToken = async (
  token: string,
): Promise<{ account: string } | null> => {
  try {
    const verifiedAccount = await JWT.verify(token, 'secret');
    return verifiedAccount as { account: string };
  } catch (err) {
    return null;
  }
};
