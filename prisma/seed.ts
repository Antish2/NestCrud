import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const test = await prisma.users.upsert({
    where: { email: 'test@prisma.io' },
    update: {
      name: 'test1',
      email: 'test1@prisma.io',
      password:'test1'
    },
    create: {
      name: 'test',
      email: 'test@prisma.io',
      password:'test'
    },
  })

  console.log({ test })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })