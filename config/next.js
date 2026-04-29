require('dotenv').config()
const { spawn } = require('node:child_process')

const args = process.argv.slice(2)

// dev | start (default: dev)
const mode = args[0] === 'start' ? 'start' : 'dev'

// CLI overrides
const cliHost = args.find(a => a.startsWith('--host='))?.split('=')[1]
const cliPort = args.find(a => a.startsWith('--port='))?.split('=')[1]

// Env defaults
const host = cliHost || process.env.NEXT_HOST 
const port = cliPort || process.env.NEXT_PORT  

const nextArgs = [mode, '-p', port]

// next start sí soporta host
if (mode === 'start') {
  nextArgs.push('-H', host)
}

const child = spawn(
  'next',
  nextArgs,
  { stdio: 'inherit', shell: true }
)

child.on('exit', code => process.exit(code))
