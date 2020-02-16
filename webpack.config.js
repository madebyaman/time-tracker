const path = require("path");
module.exports = {
  entry: path.join(__dirname + "/src/index.js"),

  output: {
    path: path.join(__dirname + "/dist/"),
    filename: "bundle.js",
    publicPath: "/dist"
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
};
