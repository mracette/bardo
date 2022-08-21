const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const optimize = process.env.OPTIMIZE === 'true';
const designMode = process.env.DESIGN_MODE;

let entry, template;

switch (designMode) {
  case 'studio': {
    entry = './studio/index.ts';
    template = './studio/index.html';
    break;
  }
  default: {
    entry = './src/index.ts';
    template = './src/dom/index.html';
    break;
  }
}

const config = {
  entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    host: '127.0.0.1'
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      // include specific files based on a RegExp
      // include: /dir/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    new CleanWebpackPlugin({
      dry: !isProduction
    }),
    new HtmlWebpackPlugin({
      template,
      inline: optimize,
      inject: 'body',
      minify: {
        collapseWhitespace: isProduction
      }
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
      path.resolve('./studio'),
      path.resolve('./svg')
    ]
  }
};

module.exports = () => {
  if (isProduction && optimize) {
    config.plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]));
    config.mode = 'production';
    config.optimization = {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 2020
              // unsafe: true
            },
            mangle: {
              toplevel: true,
              properties: {
                debug: !isProduction,
                reserved: []
              }
            }
          }
        })
      ]
    };
  } else if (isProduction && !optimize) {
    config.mode = 'none';
    config.optimization = {};
  } else {
    config.mode = 'development';
  }
  return config;
};
