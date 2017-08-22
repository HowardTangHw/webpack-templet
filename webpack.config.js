const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // 入口
  entry: {
    app: "./src/index.js",
    print: "./src/print.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/")
  },
  module: {
    rules: [
      //   CSS引入(在js中可以import)
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          },
          {
            loader: "postcss-loader" //PostCss
          }
        ]
      },
      //babel
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015"],
            plugins: ["transform-runtime"]
          }
        }
      },
      // url-loader
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
    ]
  },
  plugins: [
    //清理dist
    new CleanWebpackPlugin(["dist"]),
     // 新建一个html在dist当中,自动引入了bundle的文件
     new HtmlWebpackPlugin({
        title: "Output Management",
        // 可以加入模板
        // template: "./src/index.ejs"
      }),
  ],

};
