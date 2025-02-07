import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()

// remove field middleware by prisma
// export const prisma = new PrismaClient().$extends({
//   result: {
//     user: {
//       passwordHash: {
//         needs: {},
//         compute: () => undefined,
//       },
//     },
//   },
// });
