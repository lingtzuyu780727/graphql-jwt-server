import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import { typeDefs } from './schema';
import { Query, Mutation } from './resolvers';
import fs from 'fs';

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
});

// TODO: change to dotenv later
server.listen(3001, () => console.log(`Server is running on port 3001`));

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
