import { useState } from 'react'

export default function CreateOperationForm({ onCreate, disabled }) {
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim()) return

    onCreate(name.trim())
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
      <input
        type="text"
        placeholder="Nueva operación"
        value={name}
        onChange={(event) => setName(event.target.value)}
        style={{
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          minWidth: '260px',
        }}
      />

      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: '10px 16px',
          border: 'none',
          borderRadius: '6px',
          background: '#111827',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Crear operación
      </button>
    </form>
  )
}