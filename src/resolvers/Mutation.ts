// data base implementation
import * as fs from 'fs';
import dataModule from '../data/data.json';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// const data = fs.readFileSync('../data/data.json', 'utf-8');
// const dataJSON = JSON.parse(data);
// console.log(dataJSON.users);

interface SignupArgs {
  account: string;
  name: string;
  password: string;
  birth: string;
}

interface LoginArgs {
  account: string;
  password: string;
}

interface UserPayload {
  AuthError: {
    msg: string;
  }[];
  token: string | null;
}

const AuthResolvers = {
  signup: async (
    _: any,
    { account, name, password, birth }: SignupArgs,
  ): Promise<UserPayload> => {
    // check if input is empty
    if (!account || !password) {
      return {
        AuthError: [
          {
            msg: 'account or password cannot be empty',
          },
        ],
        token: null,
      };
    }

    // 1. use bcrypt to hash password & token
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = JWT.sign({ account }, 'secret', {
      expiresIn: 3600000,
    });
    // 2. push the data to dataJSON.users

    dataModule.users.push({
      account,
      name,
      password: hashedPassword,
      birth,
      token,
    });

    // 3. write back the data to data.json
    const newData = JSON.stringify(dataModule, null, 2);

    fs.writeFileSync('../src/data/data.json', newData, 'utf-8');

    // 4. return jwt token
    return { AuthError: [], token: token };
  },
  login: async (
    _: any,
    { account, password }: LoginArgs,
  ): Promise<UserPayload> => {
    // 1. check if the account exist
    const userAccount = dataModule.users.find(
      (user) => user.account === account,
    );
    console.log(userAccount);
    if (!userAccount) {
      return {
        AuthError: [{ msg: 'Account or password is incorrect' }],
        token: null,
      };
    }

    // 2. check if the password is correct and match the account
    const hashedPasswordinDB = userAccount.password;
    const isMatched = await bcrypt.compare(password, hashedPasswordinDB);

    if (!isMatched) {
      return {
        AuthError: [{ msg: 'Account or password is incorrect' }],
        token: null,
      };
    }

    const token = JWT.sign({ account }, 'secret', {
      expiresIn: 3600000,
    });
    return {
      AuthError: [],
      token: token,
    };
  },
};

// aggregate and export once
export const Mutation = {
  ...AuthResolvers,
};
