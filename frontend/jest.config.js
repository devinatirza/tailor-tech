module.exports = {
  setupFilesAfterEnv: ['./jest/setup.js'],
  preset: 'ts-jest',
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node'
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^react-native$': 'react-native',
    '^@/(.*)$': '<rootDir>/src/$1',
    // 'Utilities/(.*)$': '<rootDir>/node_modules/react-native/Libraries/Utilities/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react|react-native|@react-native-community|react-native-elements|@react-native/js-polyfills|@react-native/assets-registry|expo-status-bar|react-native-button)'
  ],
  globals: {
    __DEV__: true
},
};
