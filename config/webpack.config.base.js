const webpack = require('webpack')
const path = require('path')
const glob = require('glob')

const root = path.resolve(__dirname, '../')

module.exports = {
  entry: getEntries(),
  output: {
    path: path.resolve(root, 'build/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'build/fonts/',    // where the fonts will go
            publicPath: '../'       // override the default path
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=fonts/[name].[ext]"
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "url?name=images/[name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    })
  ]
}

function getEntries () {
  let files = glob.sync(path.resolve(root, 'public/js/*.js'))
  let entries = {} 
  files.forEach((file) => {
    let filepath = './' + path.relative(root, file)
    let filename = filepath.split('/').pop()
    filename = filename.substr(0, filename.lastIndexOf('.'))
    entries[filename] = filepath
  })
  return entries
}
