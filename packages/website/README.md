# Chat SDK website

This is the source of https://developers.nlx.ai/, the documentation website for the NLX Chat SDK.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Differences between `npm run dev` and _github pages_

`npm run dev` assumes routing on the SPA will be handled by the server. This means, for instance, BrowserRouter doesn't work out of the box with github pages. To emulate a _github pages_ environment locally, build the site, then load it up with caddy:

```sh
npm run build
npm run caddy
open http://localhost:9000
```

## Updating docs

API docs are generated automatically using [TypeDoc](https://typedoc.org/). To update the docs, run `npm run publish-docs` from the monorepo root and commit the changes. Feel free to trim the outputted md files for better formatting.
