import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const volumeRanges = [
  "KG_300",
  "KG_500",
  "T_1",
  "T_3",
  "T_5",
  "T_10",
  "T_20",
  "T_30"
]

async function createCosts(operationId) {
  return volumeRanges.map((range, index) => ({
    operationId,
    volumeRange: range,
    cost: 100 + index * 10,
    margin: 10 - index // algunos <=5 para probar alerta
  }))
}

async function main() {

  console.log("🌱 Seeding database...")

  const plant = await prisma.plant.create({
    data: {
      name: "Lima Plant",
      location: "Lima"
    }
  })

  const transport = await prisma.operation.create({
    data: {
      name: "Transporte",
      plantId: plant.id
    }
  })

  const storage = await prisma.operation.create({
    data: {
      name: "Almacenaje",
      plantId: plant.id
    }
  })

  await prisma.operationCost.createMany({
    data: [
      ...await createCosts(transport.id),
      ...await createCosts(storage.id)
    ]
  })

  console.log("✅ Seed completed")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })