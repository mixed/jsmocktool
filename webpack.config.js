var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
        "jsmocktool" : ['./src/jsmock.js','./src/jsstub.js'],
        // "jsmocktool.test" : ['./test/jsmock_test.js','./test/jsstub_test.js']
        "jsmocktool.test" : ['./test/jsstub_test.js']
    },
    output: {
        path: __dirname+"/dist/",
        filename: '[name].js'
    },
    module: {
        loaders: [
            { 
                test: path.join(__dirname, 'src/'),
                loader: 'babel',
                query: {
                  presets: ['es2015', 'stage-0'],
                  plugins: [
                    "transform-class-properties",
                    "transform-decorators-legacy",
                    "transform-function-bind"
                    ]
                }

            },
            { 
                test: path.join(__dirname, 'test/'),
                loader: 'babel',
                query: {
                  presets: ['es2015', 'stage-0'],
                  plugins: [
                    "transform-class-properties",
                    "transform-decorators-legacy",
                    "transform-function-bind"
                    ]
                }

            }
        ]
    },
    plugins: [
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: true,
        //     compress: {warnings: false}
        // })
    ],
    devtool: 'source-map'
};