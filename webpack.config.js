const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: {
    a: './src/a.js',
    b: './src/b.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].min.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true
  },
  // 拓展名解析顺序
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, '')
    },
    extensions: ['.js', '.css', '.json', '.jsx'],
    mainFiles: ['index', 'main'],
    mainFields: ['style', 'main'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  // devtool: 'source-map', 编译代码之后可以映射源文件
  // cheap-module-source-map 风格适合在开发环境中使用
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new BundleAnalyzerPlugin()
  ]
}

// 多入口打包
// 代码分割
// 实现分割第三方模块
// 多线程打包
// 复制进程是繁琐的并不一定会提高打包速度
// happypack

// 代码分割，CDN，dllPugin splitChunks happypack
