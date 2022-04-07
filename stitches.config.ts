import { createStitches } from '@stitches/react';

export const stitches = createStitches({
  prefix: '',
  theme: {},
  utils: {},
});

export const {
  css,
  styled,
  globalCss,
  theme,
  keyframes,
  getCssText,
  config,
  reset,
} = stitches;

function createGetLazyCssText() {
  let cache: Record<string, string> = {};

  return Object.assign(
    (path: string) => {
      if (cache[path]) return cache[path];
      const css = (cache[path] = getCssText());
      reset();
      return css;
    },
    {
      resetCache: () => (cache = {}),
    }
  );
}

export const lazyGetCssText = createGetLazyCssText();
