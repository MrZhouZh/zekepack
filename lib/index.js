const Compiler = require('./compiler');
const options = require('../zekepack.config');

new Compiler(options).run();
