const path = require('path');
const common = require('./webpack.config');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports =merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: "[name].build.js",
        path: path.resolve (__dirname, "dist"),
        publicPath: './'
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            }),
            new TerserPlugin({
                parallel: true
            }),
            new HtmlWebpackPlugin ({template: './index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                },
                cache: false,
                favicon: 'favicon.ico'},
            ),
            new UglifyJsPlugin({
                include: /\/includes/,
            }),
            new MiniCssExtractPlugin({ filename: "styles/[name].[hash].css" }),
            new BundleAnalyzerPlugin({
                openAnalyzer: true,
                analyzerMode: 'static',
                reportFilename: path.resolve(__dirname, './build2new.html'),
            }),
            new CompressionPlugin(),
        ]
      },
        plugins: [
                new MiniCssExtractPlugin({ filename: "styles/[name].[hash].css" }),
                new BundleAnalyzerPlugin({
                    openAnalyzer: true,
                    analyzerMode: 'static',
                    reportFilename: path.resolve(__dirname, './build2new.html'),
                     }),
                new CompressionPlugin({
                    filename: '[path][base].gz',
                    algorithm: 'gzip',
                    test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                    threshold: 10240,
                    minRatio: 0.8
                     }),
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
            })
        ],

})