module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4|css)$":
      "<rootDir>/src/Mocks/Mocker.js",
  },
};
