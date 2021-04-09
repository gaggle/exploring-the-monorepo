import { getLogger } from './logging'

const log = getLogger('analytics')

export class ApiAnalytics {
  // This is here to highlight tsconfig.json behaviour,
  // imagine it's well-functioning code we just don't have time to clean up at this point.
  uninitializedProperty: string

  foundAllUsers (ip: string, length: number) {
    log.info('found all users', { ip, numUsers: length, timestamp: Date.now() })
  }
}
