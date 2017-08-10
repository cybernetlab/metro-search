const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  const prod = env === 'prod';

  let plugins = [
    new ExtractTextPlugin(prod ? '[name].[hash].css' : '[name].bundle.css'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      //minify: prod,
    })
  ];

  //if (prod) {
  //  plugins.push(
  //    //new webpack.NoErrorsPlugin(),
  //    //new webpack.optimize.DedupePlugin()
  //    //new webpack.optimize.UglifyJsPlugin()
  //  );
  //}

  return {
    entry: './src/app.js',

    output: {
      path:          __dirname + '/dist',
      publicPath:    prod ? '/' : 'http://localhost:8081',
      filename:      prod ? '[name].[hash].js' : '[name].bundle.js',
      chunkFilename: prod ? '[name].[hash].js' : '[name].bundle.js',
    },

    module: {
      rules: [
        {test: /\.js$/, exclude: /node_modules/, use: [
          {loader: 'babel-loader', options: {plugins: ['transform-runtime']}}
        ]},
        {test: /\.html$/, use: ['raw-loader']},
        {test: /\.css$/, use: ExtractTextPlugin.extract({use: 'css-loader'})},
        {test: /\.scss$/, use: ExtractTextPlugin.extract({use: [
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {
            includePaths: ['./node_modules'],
            sourceMap: true}
          },
        ]})},
      ]
    },

    plugins: plugins,

    devtool: 'source-map',

    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunk: false
      }
    },
  };
};
