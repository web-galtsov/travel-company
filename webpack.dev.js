const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config');
//const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    output: {
        filename: "[name].build.js",
        path: path.resolve ( __dirname, 'dist' )
    },
    devServer: {
        contentBase: path.join ( __dirname, "build" ),
        compress: true,
        hot: true,
        port: 9000,
        watchContentBase: true,
        progress: true,
        disableHostCheck: true,
        historyApiFallback: true
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }

});