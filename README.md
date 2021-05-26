# @jpex-js/vite-plugin

This is a vite plugin to enable jpex transformations during the build process.

## Usage
```ts
import jpexPlugin from '@jpex-js/vite-plugin';

export default {
  // ...vite config
  plugins: [
    jpexPlugin()
  ]
}
```

The plugin accepts all of the same arguments as the babel plugin: https://github.com/jpex-js/babel-plugin#options