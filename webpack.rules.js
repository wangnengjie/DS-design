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
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript"
        ],
        plugins: [
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
