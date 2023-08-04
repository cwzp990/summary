const fs = require("fs-extra");
const path = require("path");

class MyWebpackPlugin {
  apply(compiler) {
    console.log(compiler);
  }
}

module.exports = MyWebpackPlugin;
