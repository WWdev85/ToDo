
const path = require ('path');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { 
      main: './src/index.js'
  },
  output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, '../', 'dist')
  },




  module: {
    rules: [
      {
         test: /\.txt$/,
         use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader']
    
     },
     {
      test: /\.(sass|scss)$/,
      use: ['style-loader' ,'css-loader','sass-loader']
   },
   {
    test: /\.(jpg|png|svg|gif|jpeg)$/,
    use: 'file-loader'
   },
   {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  } , 
    ]
  },

  devServer:{
    open: true,
    contentBase: path.resolve(__dirname, '../', 'public')
  },


  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/templates/template.html"
    }),
  
  ]
}