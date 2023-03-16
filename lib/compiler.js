const path = require('path');
const fs = require('fs');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  // 开启编译
  run() {}
  // 构建模块相关
  buildModule(filename, isEntry) {
    //
  }

  // 输入文件
  emitFiles()

}
