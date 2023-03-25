# alpha.morrisoncole.co.uk [![Open in Visual Studio Code](https://img.shields.io/badge/open%20in-vscode.dev-blue)](https://open.vscode.dev/MorrisonCole/alpha.morrisoncole.co.uk)

My personal website.

Alpha [alpha.morrisoncole.co.uk](https://alpha.morrisoncole.co.uk). Production
[morrisoncole.co.uk](https://morrisoncole.co.uk) is from
https://github.com/MorrisonCole/morrisoncole.co.uk.

# Development

1. Run `yarn install`
2. Run `yarn dev`

## Yarn

### Upgrade Yarn

`yarn upgrade`

### Upgrade Dependencies

`yarn upgrade-interactive`

## Deploy on Vercel

Deploy from local with:

```
yarn vercel
```

# CI/CD

## Performance Regression Testing

(CI Only) - make sure `LHCI_GITHUB_APP_TOKEN` is present.

Using [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) for
performance regression testing.

### Local Build

```
yarn build && yarn test:lighthouse
```

_Note:_ running locally appears to be
[broken on WSL2 at the moment](https://github.com/GoogleChrome/chrome-launcher/issues/195).

### Remote Build

```
yarn vercel | xargs -I{} yarn test:lighthouse --collect.url={}
```
