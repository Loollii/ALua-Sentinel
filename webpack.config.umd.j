const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@detectors': path.resolve(__dirname, 'src/detectors'),
      '@analyzers': path.resolve(__dirname, 'src/analyzers'),
      '@validators': path.resolve(__dirname, 'src/validators'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/types')
    }
  },
  output: {
    filename: 'alua-sentinel.min.js',
    path: path.resolve(__dirname, 'dist/umd'),
    library: {
      name: 'ALuaSentinel',
      type: 'umd',
      umdNamedDefine: true
    },
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: false
        }
      },
      extractComments: false
    })]
  },
  externals: {
    'tensorflow/tfjs': {
      commonjs: 'tensorflow/tfjs',
      commonjs2: 'tensorflow/tfjs',
      amd: 'tensorflow/tfjs',
      root: 'tf'
    }
  }
};