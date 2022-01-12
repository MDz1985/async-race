const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: false}
          }
        ]
      },
      {
        test: /\.(png|gif|svg|eot|ttf|json)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.(mp3|ogg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'audio/[hash][ext][query]'
        }
      },
      {
        test: /full.jpg$/,
        type: 'asset/resource',
        generator: {
          filename: 'full/[hash][ext][query]'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources:[
                './src/styles/vars.scss',
              ]
            }
          }
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js','.ts'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    compress: true,
    port: 3000,
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};