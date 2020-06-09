const webpack = require('webpack');
const path = require('path');
const SRC_PATH = path.join(process.cwd(), './src');

module.exports = ({ config }) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.SRC_PATH': JSON.stringify(SRC_PATH),
    })
  );

  config.module.rules.push(
    {
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /(node_modules)/,
      include: [SRC_PATH],
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [[require('@fesk/babel-config'), { typescript: true }]],
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: SRC_PATH,
    }
  );
  config.resolve.extensions.push('.jss', '.jsx', '.scss', '.ts', '.tsx');

  config.externals = {
    'node-fetch': 'fetch',
    'fetch-cookie/node-fetch': 'fetch',
  };

  return config;
};
