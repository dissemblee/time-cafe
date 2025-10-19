const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (options) => {
  return {
    ...options,
    module: {
      rules: [
        ...options.module.rules,
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [
      ...options.plugins,
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  };
};
