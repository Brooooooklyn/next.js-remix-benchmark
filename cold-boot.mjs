import { spawn } from 'child_process'
import { setTimeout } from 'timers/promises'

await new Promise((resolve, reject) => {
  console.time('remix')
  console.time('remix-start')
  const remix = spawn(`node`, ['node_modules/.bin/remix-serve', 'build'])
  const onStart = async (data) => {
    if (data.toString('utf8').startsWith('Remix App Server started at')) {
      console.timeEnd('remix-start')
      await fetch(`http://localhost:3000`).then((res) => res.arrayBuffer())
      console.timeEnd('remix')
      remix.stdout.off('data', onStart)
      remix.kill('SIGABRT')
      resolve()
    } else {
      console.log(data.toString('utf8'))
    }
  }

  remix.stdout.on('data', onStart)
  remix.on('error', reject)
})

await setTimeout(3000)
global.gc()

await new Promise((resolve, reject) => {
  console.time('next')
  console.time('next-start')
  const next = spawn(`node`, ['node_modules/.bin/next', 'start'])
  const onStart = async (data) => {
    if (data.toString('utf8').startsWith('ready')) {
      console.timeEnd('next-start')
      await fetch(`http://localhost:3000`).then((res) => res.arrayBuffer())
      console.timeEnd('next')
      next.stdout.off('data', onStart)
      next.kill('SIGABRT')
      resolve()
    } else {
      console.log(data.toString('utf8'))
    }
  }

  next.stderr.on('data', (data) => {
    console.log(data.toString('utf8'))
  })

  next.stdout.on('data', onStart)
  next.on('error', reject)
})
