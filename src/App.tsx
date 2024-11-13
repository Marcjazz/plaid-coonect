import { useState } from 'react'
import './App.css'
import Plaid from './Plaid'
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link'

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [plaidLinkToken, setPlaidLinkToken] = useState<string>()
  const [plaidMetadata, setPlaidMetadata] = useState<
    PlaidLinkOnSuccessMetadata & { public_token: string }
  >()

  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ height: 50, gap: 10, display: 'flex' }}>
          <input
            name='plaid_link_token'
            placeholder='Paste generated plaid link token here'
            style={{ width: 500, borderRadius: 5, cursor: 'text' }}
            onChange={(e) => setPlaidLinkToken(e.target.value)}
          />{' '}
          <button
            onClick={() => setIsSubmitting(true)}
            style={{
              backgroundColor: 'blue',
              border: 'none',
              borderRadius: 5,
              width: 100,
              cursor: 'pointer',
            }}
          >
            Connect
          </button>
        </div>
        <p>
          {isSubmitting && plaidLinkToken && (
            <Plaid
              setIsSubmitting={setIsSubmitting}
              plaidPublicToken={plaidLinkToken}
              setPlaidMetadata={setPlaidMetadata}
            />
          )}
        </p>
        {plaidMetadata && (
          <div
            style={{
              textAlign: 'right',
              border: '1px solid gray',
              borderRadius: 5,
              padding: 10,
            }}
          >
            {plaidMetadata.accounts.map((acc) => (
              <>
                <p>
                  Link: <b>{plaidMetadata.public_token}</b>
                </p>
                <p>
                  ID: <b>{acc.id}</b>
                </p>
                <p>
                  Name: <b>{acc.name}</b>
                </p>
                <p>
                  Mask: <b>{acc.mask}</b>
                </p>
                <p>
                  Type: <b>{acc.type}</b>
                </p>
                <p>
                  Subtype: <b>{acc.subtype}</b>
                </p>
                <p>
                  Verification status:
                  <b>{acc.verification_status}</b>
                </p>
              </>
            ))}
          </div>
        )}
      </header>
    </div>
  )
}

export default App
