import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

console.log(process.env.PRISMA_ENDPOINT);
console.log(process.env.PRISMA_SECRET);
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
});

export { prisma as default };
