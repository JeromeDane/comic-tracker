const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

const port = 3000

module.exports = {
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Comic Tracker'
    })
  ],
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.jsx?$/, use: {
        loader: 'babel-loader',
        options: {
          sourceMaps: true,
          presets: [['env', {'targets': {'browsers': ['ie >= 10']}}]],
          plugins: [['transform-react-jsx', { 'pragma': 'h' }]]
        }
      }}
    ]
  },
  devServer: {
    port,
    open: true,
    proxy: {
      '/api/*': {target: `http://localhost:${port + 1}/api/`},
      '/graphql/*': {target: `http://localhost:${port + 1}/graphql/`},
      '/graphiql/*': {target: `http://localhost:${port + 1}/graphiql/`}
    },
    stats: {
      hash: false,
      assets: false,
      version: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true
    }
  },
  devtool: 'sourcemap'
}
