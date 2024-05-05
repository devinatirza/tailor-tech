module.exports = {
  "preset": "react-native",
  "testEnvironment": "node",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  "transformIgnorePatterns": ['node_modules/(?!(jest-)?react|react-native|@react-native-community|react-native-elements|@react-native/js-polyfills|@react-native/assets-registry)'],
};