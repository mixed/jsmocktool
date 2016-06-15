var path = require('path');
var webpack = require("webpack");
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
    entry: {
        "dist/jsmocktool" : ['./src/global.js','./src/jsmocktool.js','./src/testDouble.js',
                        './src/mock/jsmock.js','./src/mock/jsmockMethodFactory.js','./src/mock/jsmockMethod.js',
                        './src/stub/jsstub.js','./src/stub/jsstubMethod.js'],
        "test/dist/jsmocktool.test" : [
            './test/jsmock.js',
            './test/jsstub.js',
            './test/start.js'
        ]
    },
    output: {
        path: __dirname+"/",
        filename: '[name].js'
    },
    module: {
        preLoaders: [
            {
                test: path.join(__dirname, 'src/'), 
                loader: "eslint-loader"
            }
        ],
        loaders: [
            { 
                test: [path.join(__dirname, 'src/'),path.join(__dirname, 'test/')],
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
    plugins:[],
    devtool: 'source-map'
};