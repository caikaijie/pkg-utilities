import path from 'path'
import fs from 'fs'
import tar from 'tar'
import { 
  fileExists, 
  spwan,
  readJson,
  remove,
  copy,
  move,
  mkdirp
} from './util'

class Pkg {
  constructor() {
    throw new Error('cannot initialize Pkg instance')
  }

  static async getPkgJson(pkgDir) {
    const pkgJsonFile = path.resolve(pkgDir, './package.json')
    // TODO: readJson failed?
    const pkgJson = await readJson(pkgJsonFile)
    // console.log('Pkg.getPkgJson', pkgJsonFile, pkgJson)

    if(!pkgJson.name) {
      throw new Error(`Invalid package.json (name not found): ${pkgJsonFile}`)
    }

    return pkgJson
  }

  //TODO: https://github.com/npm/npm/wiki/Files-and-Ignores
  static async copyFiles(files, pkgDir, destDir, { logger } = {}) {
    return Promise.all(files
      .map((item) => ({
        src: path.resolve(pkgDir, item),
        dest: path.resolve(destDir, item)
      }))
      .map((t) => { 
        if(logger) {
          logger.info(`copying ${t.src} to ${t.dest}`)
        }
        return t 
      })
      .map(({ src, dest }) => copy(src, dest, { errorOnExist: true }) )
    )
  }

  static async removeFiles(destDir, files, { logger }) {
    return Promise.all(files
      .map((item) => path.resolve(destDir, item))
      .map((item) => {
        if(logger) {
          logger.info(`removing ${item}`)
        }
        return item
      })
      .map((item) => remove(item))
    )
  }

  static async moveToDir(dir, item, destDir, { logger } = {}) {
    const src = path.resolve(dir, item)
    const dest = path.resolve(dir, destDir, path.basename(item))
    if(logger) {
      logger.info(`moving ${src} to ${dest}`)
    }
    return move(src, dest)
  }

  static async fileExists(path) {
    return fileExists(path)
  }

  static async archiveDir(dir, { removeWhenSuccess = false } = {}) {
    await tar.c(
      {
        gzip: true,
        file: `${dir}.tgz`
      },
      [ dir ]
    )

    if(removeWhenSuccess) {
      await remove(dir)
    }

    return
  }

  static async runCommad(command, cwd) {
    const parts = command.split(' ')
    if(parts.length < 1 || !parts[0]) {
      throw new Error(`Invalid command: ${command}`)
    }
    const [ c, ...args ] = parts
    return new Promise((resolve, reject) => {
      spwan(c, args, { cwd, shell: true }, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    }) 
  }

  static async start({
    pkgDir,
    destDir,
    actions,
    archive = true,
    deleteWhenSuccessArchive = true
  }, ctx) {
    const pkgJson = await Pkg.getPkgJson(pkgDir)
    const prefix = `[Pkg(${pkgJson.name})]`
    const abPkgDir = path.resolve('./', pkgDir)
    const abDestDir = path.resolve('./', destDir)
    const logger = {
      info(msg) {
        console.log(prefix, msg)
      }
    }
    const pkgCtx = {
      pkgDir: abPkgDir,
      workDir: path.resolve(abDestDir, pkgJson.name),
      logger
    }
    await remove(pkgCtx.workDir)
    await mkdirp(pkgCtx.workDir)

    const cwd = process.cwd()
    logger.info(cwd)
    try {
      logger.info(`start packaging: ${pkgCtx.pkgDir} ===> ${pkgCtx.workDir}`)
      logger.info(`entering working directory: ${pkgCtx.workDir}`)
      process.chdir(pkgCtx.workDir)      
      logger.info('starting package actions')
      for(const action of actions) {
        if(typeof action === 'function') {
          await action(pkgCtx, ctx)
        } else {
          throw new Error(`Invalid action: ${action}`)
        }
      }
      if(archive) {      
        logger.info('start archiving')
        process.chdir(abDestDir)
        await Pkg.archiveDir(pkgJson.name, { removeWhenSuccess: deleteWhenSuccessArchive })
      }
    } finally {
      logger.info(`leaving working directory: ${pkgCtx.workDir}`)
      process.chdir(cwd)
    }
  }
}

export default Pkg
