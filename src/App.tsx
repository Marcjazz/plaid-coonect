import React from 'react'
import logo from './logo.svg'
import './App.css'
import Plaid from './Plaid'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          <Plaid plaidPublicToken='GENERATED_PLAID-TOKEN' />
        </p>
      </header>
    </div>
  )
}

export default App
