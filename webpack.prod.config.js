const webpack = require('webpack');

module.exports = {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify('production'),
    }),
  ],
};
