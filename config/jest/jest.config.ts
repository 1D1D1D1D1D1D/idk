import path from 'path';

export default {
    clearMocks: false,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: [
        '\\\\node_modules\\\\',
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    modulePaths: [
        '<rootDir>',
    ],
    moduleDirectories: ['node_modules', 'src'],

    testMatch: [

        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
    ],
    rootDir: '../../',
    setupFilesAfterEnv: ['<rootDir>config/jest/jest-setup.ts'],
    moduleNameMapper: {
        '^entities/(.*)$': '<rootDir>/src/entities/$1',
        '\\.(s?css)$': 'identity-obj-proxy',
        // eslint-disable-next-line no-undef
        '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    },
    reporters: [
        'default',
        ['./node_modules/jest-html-reporter', {
            pageTitle: 'Test Report',
        }],
    ],
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: 'jest',
    },
};
