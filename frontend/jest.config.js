// module.exports = {
//   preset: 'react-native',
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
//   transformIgnorePatterns: [
//     'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-navigation|@react-navigation|react-native-reanimated|@react-native-async-storage|@react-native-community|@react-native-masked-view|@react-native-picker|@react-native-picker/.*|expo-status-bar)',
//   ],
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   testMatch: [
//     "**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"
//   ],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-elements|react-navigation|@react-navigation|react-native-reanimated|@react-native-async-storage|@react-native-community|@react-native-masked-view|@react-native-picker|@react-native-picker/.*|expo-status-bar)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    "**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   '^react-native-elements$': '<rootDir>/__mocks__/react-native-elements.js',
  // },
};
