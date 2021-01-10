const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
console.log('IS DEV:', isDev );
console.log('IS Prod:', isProd );

module.exports = {
    mode: "development",
    context: path.resolve (__dirname, 'src'),
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        filename: "[name].[hash].build.js",
        path: path.resolve ( __dirname, 'dist' ),
        publicPath: '/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: 'index.html',favicon: 'favicon.ico'
        }),
       new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|webp|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[hash].[ext]",
                    outputPath: 'images/',
                    esModule : false
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|opt|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    },
                },
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contentHash].[ext]',
                        outputPath: 'assets/videos/',
                        publicPath: 'assets/videos/'
                    },
                },
            },
        ]
    },
}