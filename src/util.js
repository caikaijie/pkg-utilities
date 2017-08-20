import { spawn as rawSpawn } from 'child_process'
import fs from 'fs'
import fse from 'fs-extra'
import promisify from 'es6-promisify'

export const stat = promisify(fs.stat)
export const copy = promisify(fse.copy)
export const mkdirp = promisify(fse.mkdirp)
export const emptyDir = promisify(fse.emptyDir)
export const readJson = promisify(fse.readJson)
export const remove = promisify(fse.remove)
export const move = promisify(fse.move)

export async function fileExists(path) {
  const stats = await stat(path)
  return stats.isFile()
}

export function spawn(command, args, options, cb = () => {}) {
  const childProcess = rawSpawn(
    command,
    args,
    {
      env: process.env,
      stdio: 'inherit',
      detached: false,
      ...options
    }
  )
  childProcess.on('close', (code) => {
    if(code !== 0) {
      cb(new Error(`Exit status ${code}`))
    } else {
      cb()
    }
  })
  childProcess.on('error', cb)
  return childProcess
}

export function packageNpmRun(packageName, npmCommand, cb) {
  return spwan('npm', npmCommand.split(' '), { cwd: `packages/${packageName}` }, cb)
}
