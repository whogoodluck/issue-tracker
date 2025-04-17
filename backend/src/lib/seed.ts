import { prisma } from './db'

async function main() {
  const issue = await prisma.issue.findMany()
  console.log('all', issue)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
