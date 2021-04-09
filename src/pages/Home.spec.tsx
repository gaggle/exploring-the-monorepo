import * as React from 'react'
import fetchMock from 'jest-fetch-mock'
import { render } from '@testing-library/react'

import { Home } from './Home'

import '@testing-library/jest-dom/extend-expect'

fetchMock.enableMocks()

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('has API section', async () => {
    const { findByText } = render(<Home/>)
    const element = await findByText(/API says/i)
    expect(element).toBeInTheDocument()
  })

  it('displays the API result', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ foo: 'bar' }))
    const { findByText } = render(<Home/>)
    const element = await findByText(/"foo": "bar"/)
    expect(element).toBeInTheDocument()
  })
})
