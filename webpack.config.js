const merge = require('webpack-merge')
const validate = require('webpack-validator')

const common = {
    entry: {
        editDeck: './app/pages/editDeck.jsx',
        decks: './app/pages/decks.jsx'
    },
    output: {
        path: 'public/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: 'style!css!sass' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /(\.js$|\.jsx$)/, loader: 'babel', exclude: /(node_modules)/, query: {presets: ['es2015', 'react']}},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
        ]
    }
}

var config

switch(process.env.npm_lifecycle_event) {
case 'build':
    config = merge(
        common, 
        {
            devtool: 'source-map'
        }
    )
    break
default:
    config = merge(
        common,
        {
            devtool: 'eval-source-map'
        }
    )
}

module.exports = validate(config)