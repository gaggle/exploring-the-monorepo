import React, { useEffect, useState } from 'react'

import { ApiAllUsers } from 'types'

import './Home.css'
import logo from './react.svg'

type ApiFetchState<D = unknown, E = Error> =
  | { kind: 'done', data: D }
  | { kind: 'error', error: E }
  | { kind: 'loading' }

export function Home () {
  const [state] = useApi<ApiAllUsers>('http://localhost:3002/allUsers')
  return (
    <div className="Home">
      <img src={logo} className="Home-logo" alt="logo"/>
      <h2>Hello world!</h2>
      <p>API says:</p>
      {
        state.kind === 'loading'
          ? <div>Loading...</div>
          : state.kind === 'error'
          ? <div>{state.error.message} 😭</div>
          : <pre><code>{JSON.stringify(state.data, null, 2)}</code></pre>
      }
    </div>
  )
}

function useApi<T> (url: string): [ApiFetchState<T>] {
  const [state, setState] = useState<ApiFetchState<T>>({ kind: 'loading' })
  if (typeof window !== 'undefined') {
    const abortController = new AbortController()
    const timeoutId = setTimeout(() => abortController.abort(), 5000)
    useEffect(() => {
      fetch(url, { signal: abortController.signal })
        .then((response) => {
          if (response.ok) return response.json()
          throw new Error(`${response.status} ${response.statusText}`)
        })
        .then(data => setState({ kind: 'done', data }))
        .catch((error) => setState({ kind: 'error', error }))
        .finally(() => clearTimeout(timeoutId))
    }, [url])
  }
  return [state]
}
