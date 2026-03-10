import { useMutation, useQuery } from '@apollo/client/react'
import { GET_PLANTS, GET_OPERATIONS_BY_PLANT } from '../graphql/queries'
import { CREATE_OPERATION, SAVE_OPERATION_COSTS } from '../graphql/mutations'
import OperationsTable from '../components/OperationsTable'
import CreateOperationForm from '../components/CreateOperationForm'

export default function OperationsPage() {
  const { data: plantsData, loading: plantsLoading } = useQuery(GET_PLANTS)

  const plantId = plantsData?.plants?.[0]?.id

  const { data, loading, error, refetch } = useQuery(GET_OPERATIONS_BY_PLANT, {
    variables: { plantId },
    skip: !plantId,
  })

  const [createOperation, { loading: creating }] = useMutation(CREATE_OPERATION)
  const [saveOperationCosts] = useMutation(SAVE_OPERATION_COSTS)

  const handleCreateOperation = async (name) => {
    await createOperation({
      variables: {
        plantId,
        name,
      },
    })

    await refetch()
  }

  const handleSaveCosts = async (operationId, costs) => {
    await saveOperationCosts({
      variables: {
        operationId,
        costs,
      },
    })

    await refetch()
  }

  if (plantsLoading || loading) return <p style={{ padding: '24px' }}>Cargando...</p>
  if (error) return <p style={{ padding: '24px' }}>Error: {error.message}</p>

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px',
      }}
    >
      <h1
        style={{
          fontSize: '36px',
          marginBottom: '8px',
          color: '#111827',
        }}
      >
        Configuración de Cotización
      </h1>

      <p
        style={{
          marginBottom: '24px',
          color: '#6b7280',
          fontSize: '16px',
        }}
      >
        Crear, editar y guardar operaciones por rango de volumen
      </p>

      <CreateOperationForm onCreate={handleCreateOperation} disabled={creating || !plantId} />

      <OperationsTable
        operations={data?.operationsByPlant ?? []}
        onSave={handleSaveCosts}
      />
    </div>
  )
}