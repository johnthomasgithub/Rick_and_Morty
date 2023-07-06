const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        // type: 'asset/resource',
        use: {
          loader: 'file-loader',
          options: { name: 'assets/[name][hash].[ext]' },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|pdf)$/,
        type: 'asset/inline',
        use: {
          loader: 'file-loader',
          options: { name: 'assets/[name][hash].[ext]' },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][hash][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'styles/styles.css' }),
  ],
  stats: 'errors-only',
}
