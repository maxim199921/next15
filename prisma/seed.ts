import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user1 = await prisma.user.create({
    data: {
      login: 'user 1',
      rating: 1000,
      passwordHash: 'password',
    }
  });
  const user2 = await prisma.user.create({
    data: {
      login: 'user 2',
      rating: 1000,
      passwordHash: 'password',
    }
  });


  await prisma.game.create({
    data: {
      field: Array(9).fill(null),
      status: 'idle',
      players: {
        connect: {
          id: user1.id
        }
      }
    },
  });

  await prisma.game.create({
    data: {
      field: Array(9).fill(null),
      status: 'idle',
      players: {
        connect: {
          id: user2.id
        }
      }
    },
  });


  // await prisma.game.create({
  //   data: {
  //     field: Array(9).fill(null),
  //     status: 'idle',
  //     players: {
  //       create: {
  //         user: {
  //           connect: { id: user.id }
  //         },
  //         index: 0,
  //       }
  //     }
  //   },
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
