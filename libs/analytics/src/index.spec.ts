import { ApiAnalytics } from '.'

describe('ApiAnalytics', () => {
  it('exposes #foundAllUsers', () => {
    const analytics = new ApiAnalytics()
    expect(analytics).toHaveProperty('foundAllUsers')
  })
})
