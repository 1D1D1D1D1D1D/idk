import path from 'path';
import type webpack from 'webpack';


import {buildWebpackConfig} from './config/build/buildWebpackConfig';
import {type BuildEnv, type BuildPaths} from './config/build/types/config';


export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        // eslint-disable-next-line no-undef
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        // eslint-disable-next-line no-undef
        build: path.resolve(__dirname, 'build'),
        // eslint-disable-next-line no-undef
        html: path.resolve(__dirname, 'public', 'index.html'),
        // eslint-disable-next-line no-undef
        src: path.resolve(__dirname, 'src'),
    };
    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env.port || 3000; 
    const config: webpack.Configuration = buildWebpackConfig({
        mode: mode,
        paths,
        isDev,
        port: PORT,
    }); 
    return config;
};
