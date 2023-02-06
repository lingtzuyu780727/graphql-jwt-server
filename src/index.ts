import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';

import { typeDefs } from './schema';
import { Query, Mutation } from './resolvers';
import { verifyAccountFromToken } from './utils/getAccountFromJWT';

dotenv.config();

const port: number = Number(process.env.SERVER_PORT);

export interface Context {
  userInfo: {
    account: string;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
  // req has different situations..
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = await verifyAccountFromToken(req.headers.authorization);
    // console.log('userInfo in index', userInfo);
    return { userInfo };
  },
});

// TODO: change to dotenv later
server.listen(port, () => console.log(`Server is running on port ${port}`));

// async function startServer(): Promise<void> {
//   const app = express();
//   const apolloServer = new ApolloServer({
//     typeDefs: typeDefs,
//     resolvers: resolvers,
//   });
//   await apolloServer.start();
//   apolloServer.applyMiddleware({ app: app });

//   app.use((req, res) => {
//     res.send('Hello from express apollo');
//   });

//   app.listen(port, () => console.log(`Server is running on port ${port}`));
// }

// startServer();
