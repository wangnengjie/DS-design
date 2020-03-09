/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let copy;

if(process.platform==="linux"){
  copy = { from: "addon/bin/DS_design", to: "../DS_design" }
}else {
  copy = { from: "addon/bin/DS_design.exe", to: "../DS_design.exe" }
}

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main/index.ts",
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules")
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".node"]
    // alias: {
    //   bindings: path.resolve(__dirname, "./addon/bindings.ts")
    // }
  },
  plugins: [
    new CopyWebpackPlugin([
      copy
    ])
  ]
};
