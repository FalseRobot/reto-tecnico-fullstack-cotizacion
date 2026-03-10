import {
  getOperationsByPlant,
  createOperation,
  saveOperationCosts,
} from './operation.repository.js'
import { isLowMargin } from '../../utils/marginValidator.js'

const withLowMarginFlag = (operation) => ({
  ...operation,
  costs: operation.costs.map((cost) => ({
    ...cost,
    lowMargin: isLowMargin(cost.margin),
  })),
})

export const fetchOperationsByPlant = async (plantId) => {
  const operations = await getOperationsByPlant(plantId)
  return operations.map(withLowMarginFlag)
}

export const createNewOperation = async (data) => {
  const operation = await createOperation(data)
  return withLowMarginFlag(operation)
}

export const saveOperationCostsForOperation = async (data) => {
  const operation = await saveOperationCosts(data)
  return withLowMarginFlag(operation)
}