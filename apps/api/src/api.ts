import cors from 'cors'
import execa from 'execa'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaClientInitializationError } from '@prisma/client/runtime'

import { ApiAllUsers } from 'types'
import { ApiAnalytics } from 'analytics'

const app = express()
const isDev = process.env.NODE_ENV !== 'production'
const prisma = new PrismaClient()

process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

async function main () {
  await waitForDb()
  if (isDev) {
    await migrateIfNecessary()
  }
  const apiAnalytics = new ApiAnalytics()
  app.use(cors())
  app.get('/allUsers', async function (req, res) {
    await sleep(700) // 😴
    const allUsers = await prisma.user.findMany({ include: { posts: true } })
    apiAnalytics.foundAllUsers(req.ip, allUsers.length)
    const payload: ApiAllUsers = {
      allUsers: allUsers.map(e => ({
        email: e.email,
        id: e.id,
        name: e.name,
        postCount: e.posts.length
      }))
    }
    res.send(payload)
  })
  app.listen(3002, () => {
    console.log(`api started at http://localhost:3002`)
  })
}

/**
 * Migrate the database if it's never been migrated before
 *
 * This is helpful when the product is run on a clean database that's just been started,
 * instead of forcing the developer to run an initial migration we run it for them here
 * to increase the chance that their first run is a successful one.
 */
async function migrateIfNecessary () {
  const [{ exists }] = await prisma.$queryRaw`SELECT EXISTS(SELECT 1
                                                            FROM information_schema.tables
                                                            WHERE table_schema = 'public'
                                                              AND table_name = '_prisma_migrations')`
  if (!exists) {
    console.log('migrating...')
    await execa.command(`prisma migrate dev`)
  }
}

async function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Block until the database can be connected to
 *
 * This is helpful when the product is raised simultaneously with the database, and the database happens to lag behind.
 */
async function waitForDb (): Promise<void> {
  let connected = false
  let lastErrMsg = ''
  const interval = setInterval(() => {
    console.log(`waiting for db… ${lastErrMsg}`)
  }, 4000)
  while (!connected) {
    try {
      await prisma.$connect()
      connected = true
    } catch (err) {
      if (!(err instanceof PrismaClientInitializationError)) {
        throw err
      }
      lastErrMsg = err.message.split('\n')[0]
      await sleep(250)
    }
  }
  clearInterval(interval)
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
