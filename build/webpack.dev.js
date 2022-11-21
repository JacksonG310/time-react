const baseCofing = require('./webpack.base');
const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = merge(baseCofing, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 3000,
        compress: false,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "../public"),
        }
    },
    plugins: [
        new ReactRefreshWebpackPlugin()
    ]
})

module.exports = config;