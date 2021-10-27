const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: './static/js/main.js',
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'static/dist'),
    publicPath: '/static/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"],
          plugins: [],
        },
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/base.html"),
        filename: "../../templates/base.html"
    }),
    new MiniCssExtractPlugin(),
  ],
};