import { useEffect, useState } from 'react'

const volumeOrder = ['KG_300', 'KG_500', 'T_1', 'T_3', 'T_5', 'T_10', 'T_20', 'T_30']

const volumeLabels = {
  KG_300: '300 kg',
  KG_500: '500 kg',
  T_1: '1 T',
  T_3: '3 T',
  T_5: '5 T',
  T_10: '10 T',
  T_20: '20 T',
  T_30: '30 T',
}

const buildInitialState = (operations) => {
  const state = {}

  operations.forEach((operation) => {
    state[operation.id] = {}

    operation.costs.forEach((cost) => {
      state[operation.id][cost.volumeRange] = {
        cost: cost.cost,
        margin: cost.margin,
      }
    })
  })

  return state
}

export default function OperationsTable({ operations, onSave }) {
  const [formState, setFormState] = useState({})

  useEffect(() => {
    setFormState(buildInitialState(operations))
  }, [operations])

  const handleMarginChange = (operationId, volumeRange, value) => {
    setFormState((prev) => ({
      ...prev,
      [operationId]: {
        ...prev[operationId],
        [volumeRange]: {
          ...prev[operationId]?.[volumeRange],
          cost: Number(prev[operationId]?.[volumeRange]?.cost ?? 0),
          margin: value === '' ? '' : Number(value),
        },
      },
    }))
  }

  const handleSave = (operationId) => {
    const operationData = formState[operationId] || {}

    const costs = volumeOrder.map((volumeRange) => ({
      volumeRange,
      cost: Number(operationData[volumeRange]?.cost ?? 0),
      margin: Number(operationData[volumeRange]?.margin ?? 0),
    }))

    onSave(operationId, costs)
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: '24px' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          border: '1px solid #d1d5db',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#0f172a', color: '#fff' }}>
            <th style={headerCellStyle}>Operación</th>
            {volumeOrder.map((volume) => (
              <th key={volume} style={headerCellStyle}>
                {volumeLabels[volume]}
              </th>
            ))}
            <th style={headerCellStyle}>Acción</th>
          </tr>
        </thead>

        <tbody>
          {operations.map((operation) => (
            <tr key={operation.id}>
              <td style={nameCellStyle}>{operation.name}</td>

              {volumeOrder.map((volumeRange) => {
                const value = formState[operation.id]?.[volumeRange]?.margin ?? ''
                const lowMargin = Number(value) <= 5 && value !== ''

                return (
                  <td key={volumeRange} style={bodyCellStyle}>
                    <div
                      style={{
                        padding: '14px',
                        borderRadius: '8px',
                        backgroundColor: lowMargin ? '#fee2e2' : '#f8fafc',
                        border: lowMargin ? '1px solid #fca5a5' : '1px solid #e5e7eb',
                      }}
                    >
                      <input
                        type="number"
                        value={value}
                        onChange={(event) =>
                          handleMarginChange(operation.id, volumeRange, event.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />

                      {lowMargin && (
                        <div
                          style={{
                            marginTop: '10px',
                            color: '#b91c1c',
                            fontSize: '12px',
                            fontWeight: 600,
                            textAlign: 'center',
                          }}
                        >
                          Margen ≤ 5%
                        </div>
                      )}
                    </div>
                  </td>
                )
              })}

              <td style={bodyCellStyle}>
                <button
                  onClick={() => handleSave(operation.id)}
                  style={buttonStyle}
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const headerCellStyle = {
  padding: '16px',
  border: '1px solid #334155',
  textAlign: 'center',
  fontSize: '14px',
  whiteSpace: 'nowrap',
}

const bodyCellStyle = {
  padding: '12px',
  border: '1px solid #e5e7eb',
  textAlign: 'center',
  verticalAlign: 'top',
  minWidth: '140px',
}

const nameCellStyle = {
  padding: '12px 16px',
  border: '1px solid #e5e7eb',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  minWidth: '140px',
}

const buttonStyle = {
  padding: '10px 14px',
  border: 'none',
  borderRadius: '6px',
  background: '#111827',
  color: '#fff',
  cursor: 'pointer',
}