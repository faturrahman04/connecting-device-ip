import React, { useState } from 'react'
import '../public/css/App.css'

function App() {

  const [ipAddress, setIpAddress] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleOnchange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIpAddress(ev.currentTarget.value)
  }

  const handleIpAddress = async (ev: React.MouseEvent<HTMLInputElement>) => {
    ev.preventDefault()

    const response = await fetch(`http://localhost:8000/ping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ipAddress
      })
    })

    const data = await response.json()
    console.log(data)

    setIsOnline(data.online)
    setMessage(data.results.message)
  }

  return (
    <div className='container'>
      <div className='form-set-ip'>
        <h1>IP Address</h1>
        <p className='response-ping' style={{color: isOnline ? 'green' : 'red'}}>{message}</p>
        <form action="">
          <input onChange={handleOnchange} type="text" id='ip-adress' name='ip-addressW' placeholder='2b:00:ff:0d:dd:00' />
          <button onClick={handleIpAddress}>Set IP Address</button>
        </form>
      </div>
    </div>
  )
}

export default App
