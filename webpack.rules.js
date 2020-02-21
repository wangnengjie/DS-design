module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader"
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules"
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-typescript",
          "@babel/preset-env",
          "@babel/preset-react"
        ],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-transform-runtime",
          [
            "import",
            {
              libraryName: "antd",
              libraryDirectory: "es",
              style: "css"
            }
          ]
        ]
      }
    }
  },
  {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"]
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: ["file-loader"]
  }
];
