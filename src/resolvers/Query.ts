import dataModule from '../data/data.json';

import { Context } from '../index';

export const Query = {
  me(_parent: any, _args: any, { userInfo }: Context) {
    // not able to pass jwt verify
    console.log('userInfo in query', userInfo);
    if (!userInfo) {
      return null;
    }

    const userProfile =
      dataModule.users.find((user) => user.account === userInfo.account) ||
      undefined;

    // query db error
    if (!userProfile) {
      return null;
    }

    return {
      account: userProfile.account,
      name: userProfile.name,
      birth: userProfile.birth,
    };
  },
};
