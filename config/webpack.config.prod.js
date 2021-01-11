
const path = require ('path');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: { 
      main: './src/index.js'
  },
  output: {
      filename: 'js/[name]-[contenthash:4].js',
      path: path.resolve(__dirname, '../', 'build')
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      } , 
      {
         test: /\.txt$/,
         use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader ,'css-loader']
     },
     {
      test: /\.(sass|scss)$/,
      use: [MiniCssExtractPlugin.loader ,'css-loader','sass-loader']
     },
     {
      test: /\.(jpg|png|svg|gif|jpeg)$/,
      use: [{
      loader: 'file-loader',
      options:{
          name: '[name][contenthash:4].[ext]',
          outputPath: 'images',
          publicPath: '../images',

      }
     },{
        loader: 'image-webpack-loader',
        options:{
            mozjpeg:{
                quality: 70,
                progressive: true,
            }
        }
     }]
    },
    ]
  },

  

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/templates/template.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:4].css'
    }),
    new CopyPlugin(
        [
          {
            from: 'public/images',
            to: 'images',
          }
        ]
      )
  ]
}