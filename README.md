# alpha.morrisoncole.co.uk [![Open in Visual Studio Code](https://img.shields.io/badge/open%20in-vscode.dev-blue)](https://open.vscode.dev/MorrisonCole/alpha.morrisoncole.co.uk)

My personal website.

Alpha [alpha.morrisoncole.co.uk](https://alpha.morrisoncole.co.uk). Production
[morrisoncole.co.uk](https://morrisoncole.co.uk) is from
https://github.com/MorrisonCole/morrisoncole.co.uk.

# Development

## Requirements

You'll need Node. Using `nvm` is recommended.

1. `nvm use`
2. `npm install`
3. `npm run dev`, etc.

## Deploy on Vercel

Deploy from local with:

```
npx vercel
```

# CI/CD

## Performance Regression Testing

(CI Only) - make sure `LHCI_GITHUB_APP_TOKEN` is present.

Using [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) for
performance regression testing.

### Local Build

```
npm run build && npm run test:lighthouse
```

_Note:_ running locally appears to be
[broken on WSL2 at the moment](https://github.com/GoogleChrome/chrome-launcher/issues/195).

### Remote Build

```
npx vercel | xargs -I{} npm run test:lighthouse --collect.url={}
```
