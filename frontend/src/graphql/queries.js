import { gql } from '@apollo/client'

export const GET_PLANTS = gql`
  query {
    plants {
      id
      name
    }
  }
`

export const GET_OPERATIONS_BY_PLANT = gql`
  query GetOperationsByPlant($plantId: ID!) {
    operationsByPlant(plantId: $plantId) {
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