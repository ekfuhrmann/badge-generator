var webpack = require('webpack');
var path = require('path');

var SRC = path.resolve(__dirname, 'src');
var PUBLIC = path.resolve(__dirname, 'public');

var config = {
    entry: SRC + '/index.jsx',
    output: {
        path: PUBLIC,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                exclude: /node_modules/
            }
        ],
        // Loaders are what manage all of your actual code and assets.
        loaders: [
            { // ES6 loader config
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel']
            }
        ]
    }
};

module.exports = config;
