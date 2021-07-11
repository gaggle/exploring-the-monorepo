import express from 'express'

/** Immediately exit the process */
function processExit (code: number): void {
  process.exit(code)
}

process.once("SIGINT", () => processExit(0))
process.once("SIGTERM", () => processExit(0))
// ⬑ This service runs inside a Docker environment, as the first and only process.
// But! The first process in Linux is special: It must handle interrupt signals!
// That is: If we don't do these signal subscriptions our process won't exit when receiving CTRL-C.
// We *could* work around that by using Docker's `--init` argument (i.e. `docker run -it --init <image>`),
// which wraps Dockerfile's ENTRYPOINT in "tini", a small signal-handling process (https://github.com/krallin/tini).
// But then we're forcing others to run our image in a special way… Seems simpler to just handle the signals ourselves.

// this require is necessary for server HMR to recover from error
// tslint:disable-next-line:no-var-requires
let app = require('./server').default

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      app = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`> Started on port ${port}`)
  })
