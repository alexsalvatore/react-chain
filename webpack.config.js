const HtmlWebPackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [htmlPlugin],
  devServer: {
    contentBase: resolve(__dirname, "..", "static"),
    hot: true,
    publicPath: "/",
    historyApiFallback: true,
  },
};
