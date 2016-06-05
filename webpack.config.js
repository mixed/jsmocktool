var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
        "jsmocktool" : ['./src/jsmocktool.js','./src/test.double.js','./src/mock/jsmock.js','./src/mock/jsmock.factory.js',,'./src/mock/jsmock.method.js','./src/stub/jsstub.js','./src/stub/jsstub.method.js'],
        "jsmocktool.test" : ['./test/jsmock.js','./test/jsstub.js','./test/start.js']
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