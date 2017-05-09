const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const clientSourcePath = path.join(__dirname, './client');
const buildPath = path.join(__dirname, './dist');
const appPath = path.join(__dirname, './app');

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new webpack.NamedModulesPlugin(),
  function writeHashToFile() {
    this.plugin('done', (stats) => {
      const build = { hash: stats.toJson().hash };
      fs.writeFileSync(path.join(appPath, 'build.generated.json'), JSON.stringify(build));
    });
  }
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader'
    ]
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader!postcss-loader'
    })
  }, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader!postcss-loader!sass-loader'
    })
  }
];

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new ExtractTextPlugin({
      filename: '[hash]/app.css',
      allChunks: true
    })
  );
} else {
  plugins.push(
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    })
  );
}

module.exports = {
  devtool: isProduction ? false : 'source-map',
  context: clientSourcePath,
  entry: {
    js: './index.jsx'
  },
  output: {
    path: buildPath,
    filename: isProduction ? '[hash]/app.js' : 'app.js'
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins
};
