const prodConfig = require('./webpack.prod.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const { merge } = require('webpack-merge')

const config = smp.wrap(merge(prodConfig, {

}))

module.exports = config;
