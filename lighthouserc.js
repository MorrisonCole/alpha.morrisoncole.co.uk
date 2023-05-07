module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "yarn start",
      startServerReadyPattern: "ready - started server",
      numberOfRuns: 1,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "bf-cache": "warn",
        "color-contrast": "warn",
        "csp-xss": "warn",
        "is-crawlable": "warn",
      },
    },
  },
};
