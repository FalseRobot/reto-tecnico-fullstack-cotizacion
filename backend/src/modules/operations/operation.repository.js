import prisma from '../../config/prisma.js'

export const getOperationsByPlant = async (plantId) => {
  return prisma.operation.findMany({
    where: { plantId },
    include: {
      costs: true,
    },
  })
}

export const createOperation = async ({ plantId, name }) => {
  return prisma.operation.create({
    data: {
      name,
      plantId,
    },
    include: {
      costs: true,
    },
  })
}

export const saveOperationCosts = async ({ operationId, costs }) => {
  await prisma.$transaction(
    costs.map((item) =>
      prisma.operationCost.upsert({
        where: {
          operationId_volumeRange: {
            operationId,
            volumeRange: item.volumeRange,
          },
        },
        update: {
          cost: item.cost,
          margin: item.margin,
        },
        create: {
          operationId,
          volumeRange: item.volumeRange,
          cost: item.cost,
          margin: item.margin,
        },
      })
    )
  )

  return prisma.operation.findUnique({
    where: { id: operationId },
    include: {
      costs: true,
    },
  })
}