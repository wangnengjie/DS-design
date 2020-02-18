/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules")
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".node"],
    alias: {
      bindings: path.resolve(__dirname, "./addon/bindings.ts")
    }
  }
};
