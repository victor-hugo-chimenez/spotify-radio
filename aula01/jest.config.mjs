const defaultConfigs = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      function: 100,
      lines: 100,
      statements: 100
    }
  },
  maxWorkers: "50%",
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: [
    "node_modules"
  ]
}



export default {
  projects: [{
    ...defaultConfigs,
    testEnvironment: "node",
    displayName: "backend",
    collectCoverageFrom: [
      "server/",
      "!server/index.js"
    ],
    transformIgnorePatterns: [
      ...defaultConfigs.transformIgnorePatterns,
      "public"
    ],
    testMatch: [
      "**/tests/**/server/**/*.test.js"
    ]
    },
    {
      ...defaultConfigs,
      testEnvironment: "jsdom",
      displayName: "frontend",
      collectCoverageFrom: [
        "public/"
      ],
      transformIgnorePatterns: [
        ...defaultConfigs.transformIgnorePatterns,
        "server"
      ],
      testMatch: [
        "**/tests/**/public/**/*.test.js"
      ]
      }]
}