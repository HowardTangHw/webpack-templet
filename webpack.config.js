const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // 入口
  entry: {
    app: "./src/index.js",
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
      //jshint
      // {
      //   test: /\.js$/, // 涵盖 .js 文件
      //   enforce: "pre", // 预先加载好 jshint loader
      //   exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
      //   use: [
      //     {
      //       loader: "jshint-loader"
      //     }
      //   ]
      // }
      //eslint
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
            'eslint-loader'
        ],
        query: {
            cacheDirectory: true
        }
    },
    ]
  },
  plugins: [
    //清理dist
    new CleanWebpackPlugin(["dist"]),
    // 新建一个html在dist当中,自动引入了bundle的文件
    new HtmlWebpackPlugin({
      title: "Output Management"
      // 可以加入模板
      // template: "./src/index.ejs"
    }),
    // new webpack.LoaderOptionsPlugin({
    //   // 更多jslint的配置项
    //   jshint: {
    //     // 查询jslint配置项，请参考 http://www.jshint.com/docs/options/
    //     // 例如
    //     esnext:true,
    //     camelcase: true,
    //     //jslint的错误信息在默认情况下会显示为warning（警告）类信息
    //     //将emitErrors参数设置为true可使错误显示为error（错误）类信息
    //     emitErrors: false,
    //     //jshint默认情况下不会打断webpack编译
    //     //如果你想在jshint出现错误时，立刻停止编译
    //     //请设置failOnHint参数为true
    //     failOnHint: false,

    //     // 自定义报告函数 (一般不需要)
    //     // reporter: function(errors) {}
    //   }
    // })
  ]
};
