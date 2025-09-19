const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  mode: 'production',
  experiments: {
    outputModule: true
  },
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
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/esm'),
    library: {
      type: 'module'
    },
    module: true,
    environment: {
      module: true
    }
  },
  externals: {
    'tensorflow/tfjs': 'module tensorflow/tfjs',
    'onnxruntime-node': 'module onnxruntime-node'
  }
};