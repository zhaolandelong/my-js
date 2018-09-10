const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  verbose: true,
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  // testRegex: '.*\\.test\\.js$',
  testMatch: [ // 匹配的测试文件
    '<rootDir>/**/__tests__/**/?(*.)(spec|test).{js,jsx,mjs}'
    // '<rootDir>/components/Layout/__tests__/*.{js,jsx,mjs}'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js'
  }
};
