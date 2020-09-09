import { theme as chakraTheme, extendTheme } from "@chakra-ui/core";

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ["40em", "52em", "64em"];

const theme = extendTheme({
  colors: {
    ...chakraTheme.colors,
  },
  sizes: {
    header: "56px",
  },
  fonts,
  breakpoints,
});

export default theme;
