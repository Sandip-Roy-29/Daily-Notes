export default {
    testEnvironment: 'node',

    coveragePathIgnorePatterns: ["/node_modules/"],

    collectCoverageFrom:[
        "src/**/*.js",
        "!src/index.js",
    ],

    testMatch: [
        "**/_tests_/**/*.js",
        "**/?(*.)+(spec|test).js",
    ],

    transform: {},

    verbose: true,
}