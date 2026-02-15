module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:4173/en"],
      startServerCommand: "npm run preview",
      startServerReadyPattern: "ready in",
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
        "total-byte-weight": "warn",
        "unused-javascript": "warn",
        "unused-css-rules": "warn",
        "network-dependency-tree-insight": "warn",
        "legacy-javascript-insight": "warn",
      },
    },
  },
};
