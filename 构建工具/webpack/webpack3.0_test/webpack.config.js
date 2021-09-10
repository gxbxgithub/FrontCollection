const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
        // use: ExtractTextPlugin.extract({
        //   use: ['css-loader'],
        //   fallback: 'style-loader'
        // })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
  devServer: {
    contentBase: './dist',
    port: 9000,
  },
}