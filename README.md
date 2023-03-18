# Laravel mix WebpackConfig extension

A laravel mix extension that allow us to get the webpack config as a string. So we do whatever we want with it.<br>
Including writing to files. Unlike `.dump()` component that only print to console.

Also the extension does patch `.dump()` and `dumpWebpackConfig()` to take a callback that return the config.

```js
// without dumping the config
mix.getWebpackConfig((config, stringify) => {
  fs.writeFileSync('webpackConfig.output.js', stringify(config));
});

// with dumping the config (patched)
mix.dump((config, stringify) => {
  fs.writeFileSync('webpackConfig.output.js', stringify(config));
});

// or
mix.dumpWebpackConfig((config, stringify) => {
  fs.writeFileSync('webpackConfig.output.js', stringify(config));
});
```

## Links

**npmjs:** https://www.npmjs.com/package/laravel-mix-webpack-config   
**laravel-mix extensions:** https://laravel-mix.com/extensions/webpack-config

## Installation:

I suggest using pnpm

pnpm

```
pnpm add laravel-mix-webpack-config -D
```

npm

```
npm install laravel-mix-webpack-config -D
```

yarn

```
yarn add laravel-mix-webpack-config -D
```

## Usage Example:

```js
const mix = require('laravel-mix');
const fs = require('fs');

require('laravel-mix-webpack-config');

const public_dir = 'public';

mix
  .setPublicPath(`${public_dir}`)
  .js(`${public_dir}/src/app.js`, `${public_dir}/dist`)
  .vue()
  .version([`${public_dir}/src/index.js`])
  .extract(['vue'], `dist/v.js`)
  .getWebpackConfig((config, stringify) => {
    fs.writeFileSync('webpackConfig.output.js', stringify(config));
  });
```

You can see it allow us to write the config to a file:

```js
mix.getWebpackConfig((config, stringify) => {
  fs.writeFileSync('webpackConfig.output.js', stringify(config));
});
```

Take a callback as a param. With signature:

```ts
(
  webpackConfig: WebpackDomain.Configuration,
  stringify: DumpWebpackConfig['circularStringify'],
) => void;
```

**webpackConfig**: the final webpack config as an object.<br>
**stringify**: Same circular stringify function that is implemented in the Dump component (when you use `.dump()`). So you expect to get the same string as the one used by `.dump()` logging component.

Giving this structure. You can do whatever you want with the object. Including something involving stringify like writing to a file.

### Patching dump() and dumpWebpackConfig()

`dump()` and `dumpWebpackConfig()` are patched. So they take the same callback. With the same signature. They keep working as before. Plus that callback as an extra part of the patch.<br>
`dump()`, `dumpWebpackConfig()` => dump the config to the console **+** can get the config as well to do something with it. Like writing to a file.

### Aliases

You can use any of the bellow Aliases in place of `getWebpackConfig()`.

```ts
.getWebpackConfig()
.listenWebpackConfig()
.lwc()
```
