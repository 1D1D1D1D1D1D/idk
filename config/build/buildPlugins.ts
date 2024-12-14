import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import { type BuildOptions } from './types/config';

export function buildPlugins({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/locales',
                    to: paths.buildLocales,
                },
            ],
        }),
    ];
    if (isDev) {
        plugins.push(
            new webpack.DefinePlugin({
                __IS_DEV__: JSON.stringify(isDev),
                __PROJECT__: JSON.stringify(project),
                __API__: JSON.stringify(apiUrl),

            }),

        );
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
    }

    return plugins;
}
