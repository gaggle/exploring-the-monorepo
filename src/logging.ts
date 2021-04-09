export function getLogger (name: string) {
  return {
    info: (...args: any[]) => {
      console.info(`${name}:`, ...args)
    }
  }
}
