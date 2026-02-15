module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:4173/en"],
      startServerCommand: "npm run preview",
      startServerReadyPattern: "Local:",
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
        "unminified-css": "warn",
        "render-blocking-resources": "warn",
        "render-blocking-insight": "warn",
      },
    },
  },
};
