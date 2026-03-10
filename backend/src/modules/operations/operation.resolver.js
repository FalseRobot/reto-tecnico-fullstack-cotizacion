import prisma from '../../config/prisma.js'
import {
  fetchOperationsByPlant,
  createNewOperation,
  saveOperationCostsForOperation,
} from './operation.service.js'

export const operationResolvers = {
  Query: {
    plants: async () => {
      return prisma.plant.findMany()
    },

    operationsByPlant: (_, { plantId }) => {
      return fetchOperationsByPlant(plantId)
    },
  },

  Mutation: {
    createOperation: (_, args) => {
      return createNewOperation(args)
    },

    saveOperationCosts: (_, args) => {
      return saveOperationCostsForOperation(args)
    },
  },
}