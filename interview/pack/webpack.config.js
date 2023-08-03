const path = require("path");

const MyWebpackPlugin = require("./plugin/my-webpack-plugin.js");

module.exports = {
  entry: {
    entryA: path.resolve(__dirname, "src/entryA.js"),
    entryB: path.resolve(__dirname, "src/entryB.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  plugin: [new MyWebpackPlugin()],

  resolve: {
    extensions: [".js", ".ts"],
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: [path.resolve(__dirname, "loader/transformArrowFn.js")],
      },
    ],
  },
};
