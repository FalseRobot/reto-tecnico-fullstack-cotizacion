import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import fs from 'fs'

import { operationResolvers } from './modules/operations/operation.resolver.js'

const baseSchema = fs.readFileSync('./src/graphql/schema.graphql', 'utf8')
const operationSchema = fs.readFileSync('./src/modules/operations/operation.schema.graphql', 'utf8')

const typeDefs = [baseSchema, operationSchema]

const resolvers = [operationResolvers]

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server)
)

app.listen(4000, () => {
  console.log('graphQL running at http://localhost:4000/graphql')
})