const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const config = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, '../src')],
                test: /\.(ts|tsx)$/,
                use: ['thread-loader', 'babel-loader']
            }, {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                exclude: [path.resolve(__dirname, '../src/assets/icons')],
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            }, {
                test: /\.svg$/,
                include: [path.resolve(__dirname, '../src/assets/icons')],
                use: [{
                    loader: 'svg-sprite-loader',
                    options: {
                        symbolId: 'icon-[name]'
                    }
                }]
            }, {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            }, {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        }),
        new Webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        })
    ],
    resolve: {
        extensions: ['.js', 'jsx', '.tsx', '.ts'],
        alias: {
            '@': path.join(__dirname, '../src')
        },
        modules: [path.resolve(__dirname, '../node_modules')]
    },
    cache: {
        type: 'filesystem'
    }
}

module.exports = config;