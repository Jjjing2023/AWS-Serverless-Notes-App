var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
const path = require('path');

const API_ROOT = 'https://2h1xr6zm95.execute-api.us-east-2.amazonaws.com/prod';
const STAGE = '';
const METADATA = webpackMerge(commonConfig.metadata, {
    API_ROOT: API_ROOT,
    STAGE: STAGE
});

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, './public/scripts/app'),
        publicPath: '/scripts/app',
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'awesome-typescript-loader', options: {
                        transpileOnly: true
                    }},
                    { loader: 'angular2-template-loader' },
                    { loader: 'angular-router-loader' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'API_ROOT': JSON.stringify(METADATA.API_ROOT),
            'STAGE': JSON.stringify(METADATA.STAGE)
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
