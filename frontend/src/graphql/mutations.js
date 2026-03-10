import { gql } from '@apollo/client'

export const CREATE_OPERATION = gql`
  mutation CreateOperation($plantId: ID!, $name: String!) {
    createOperation(plantId: $plantId, name: $name) {
      id
      name
      plantId
      costs {
        id
        volumeRange
        cost
        margin
        lowMargin
      }
    }
  }
`

export const SAVE_OPERATION_COSTS = gql`
  mutation SaveOperationCosts($operationId: ID!, $costs: [OperationCostInput!]!) {
    saveOperationCosts(operationId: $operationId, costs: $costs) {
      id
      name
      costs {
        id
        volumeRange
        cost
        margin
        lowMargin
      }
    }
  }
`