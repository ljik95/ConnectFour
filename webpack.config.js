module.exports = {
  entry: './client/index.js', // assumes your entry point is the index.js in the client folder
  mode: 'development',
  output: {
    path: __dirname, // assumes your bundle.js will also be in the public folder
    filename: './public/bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
};
