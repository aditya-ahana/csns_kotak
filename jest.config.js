module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["jest-canvas-mock"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4|css)$":
      "<rootDir>/src/Mocks/Mocker.js",
      "lottie-react": "<rootDir>/src/Mocks/LottieMock.js"
  },
};

