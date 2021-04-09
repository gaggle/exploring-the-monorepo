interface Logger {
  info: (...args: any[]) => void
}

export function getLogger (name: string): Logger {
  return {
    info: (...args: any[]) => {
      console.info(`${name}:`, ...args)
    }
  }
}
