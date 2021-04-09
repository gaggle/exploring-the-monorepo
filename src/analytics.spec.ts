import { ApiAnalytics } from './analytics'

describe('ApiAnalytics', () => {
  it('exposes #foundAllUsers', () => {
    const analytics = new ApiAnalytics()
    expect(analytics).toHaveProperty('foundAllUsers')
  })
})
