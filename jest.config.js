/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: 'jest-expo',
    testTimeout: 5000,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
