import { join } from 'path'

const context = join(__dirname, 'src')

export default {
  context,
  entry: './index.js',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'shevyjs'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [context]
      }
    ]
  }
}
