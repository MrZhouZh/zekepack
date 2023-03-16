const path = require('path');
const fs = require('fs');
const { getAST, getDependencies, transform } = require('./parser')

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  // 开启编译
  run() {
    const entryModule = this.buildModule(this.entry, true)
    this.modules.push(entryModule)
    this.modules.forEach((module) => {
      module.dependencies.forEach((dependency) => {
        this.modules.push(this.buildModule(dependency))
      })
    })
    // console.log(this.modules)
    this.emitFiles()
  }
  // 构建模块相关
  buildModule(filename, isEntry) {
    let ast
    if (isEntry) {
      ast = getAST(filename)
    } else {
      const absoulePath = path.join(process.cwd(), './src', filename)
      ast = getAST(absoulePath)
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      transformCode: transform(ast),
    }
  }

  // 输入文件
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename)

    let modules = ''
    this.modules.forEach((module) => {
      modules += `'${module.filename}' : function(require, module, exports) {${module.transformCode}},`;
    })

    const bundle = `(function(modules) {
  function require(fileName) {
    const fn = modules[fileName];
    const module = { exports:{}};
    fn(require, module, module.exports)
    return module.exports
  }
  require('${this.entry}')
})({${modules}})`

    fs.writeFileSync(outputPath, bundle, 'utf-8')
  }

}
