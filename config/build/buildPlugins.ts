import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {type BuildOptions} from './types/config';
import {BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
export function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename:  'css/[name].[contenthash:8].css',
        }),
      
    ];

    if (isDev) {
        plugins.push(
            new webpack.DefinePlugin({
                __IS_DEV__: JSON.stringify(isDev),
            }),
            new BundleAnalyzerPlugin({
                openAnalyzer: false
            }))
    }
   
    return plugins
}
 