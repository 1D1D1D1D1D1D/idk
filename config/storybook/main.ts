import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    framework: '@storybook/react-webpack5',
    stories: [
        '../../src/**/*.stories.@(ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-webpack5-compiler-swc',
    ],
    core: {
        builder: {
            name: '@storybook/builder-webpack5',
            options: {
                fsCache: true,
                lazyCompilation: true,
            },
        },
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    }),
};
export default config;
