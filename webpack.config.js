const path = require('path')
const ExtractTestPlugin = require('extract-text-webpack-plugin')

const distDir = path.resolve(__dirname, 'client/dist')
const srcDir = path.resolve(__dirname, 'client')

const extractPlugin = new ExtractTestPlugin({
  filename: 'style.css'
})

module.exports = {
  entry: srcDir + '/js/client.js',
  output: {
    filename: 'build.js',
    path: distDir
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: srcDir,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }
    ]

  },
  plugins: [
    extractPlugin
  ]
}
