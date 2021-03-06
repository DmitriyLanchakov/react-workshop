import { LOG_DISABLE } from 'karma/lib/constants';

import webpackTestConfig from './webpack/test';

const karmaCommonConfig = {
    port: 3001,
    webpackPort: 3002,
    colors: true,
    basePath: './',
    files: [
        'test/index.js'
    ],

    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'test/index.js': 'webpack'
    },

    // https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'mocha' ],
    webpack: webpackTestConfig,
    webpackMiddleware: {
        noInfo: true,
        quiet: true
    },

    // https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'mocha', 'coverage' ],

    // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
    coverageReporter: {
        dir: 'coverage/',
        subdir(browser) {
            return browser.toLowerCase().split(/[ /-]/)[0];
        },
        reporters: [
            {
                type: 'html'
            },
            {
                type: 'lcovonly', subdir: '.'
            },
            {
                type: 'text-summary', subdir: '.'
            }
        ]
    },

    logLevel: LOG_DISABLE,

    browsers: [ 'Firefox' ],

    browserNoActivityTimeout: 30000, // default 10 * 1000
    browserDisconnectTimeout: 10000, // default 2 * 1000
    browserDisconnectTolerance: 1 // default 0
};

export const build = {
    ...karmaCommonConfig,
    singleRun: true,
    autoWatch: false
};

export const dev = {
    ...karmaCommonConfig,
    singleRun: false,
    autoWatch: true,
    reporters: [
        'clear-screen',
        ...karmaCommonConfig.reporters
    ]
};
