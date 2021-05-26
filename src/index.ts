import { transform } from '@babel/core';
import type { Plugin } from 'vite';

interface Opts {
  identifier?: string | string[];
  publicPath?: string | boolean;
  pathAlias?: Record<string, string>;
  omitIndex?: boolean;
}

export default (opts: Opts = {}) => {
  const identifier: string[] = [].concat(opts.identifier || 'jpex');
  identifier.push('react-jpex');

  const plugin: Plugin = {
    name: 'jpex',
    enforce: 'pre',
    transform(code, id) {
      if (/\.ts(x?)$/.test(id) === false) {
        return;
      }
      if (identifier.some((name) => code.includes(name)) === false) {
        return;
      }
      return new Promise((res, rej) => {
        transform(
          code,
          {
            filename: id,
            babelrc: false,
            presets: [],
            plugins: [
              '@babel/plugin-syntax-typescript',
              [ 'jpex/babel-plugin', opts ],
            ],
          },
          (err, result) => {
            if (err) {
              return rej(err);
            }
            res({ code: result.code });
          }
        );
      });
    },
  };

  return plugin;
};
