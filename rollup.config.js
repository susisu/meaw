const pkg = require("./package.json");

export default {
  input   : "src/meaw.js",
  external: Object.keys(pkg.dependencies || {}),
  output  : [
    {
      format   : "cjs",
      file     : pkg.main,
      sourcemap: true,
    },
    {
      format   : "es",
      file     : pkg.module,
      sourcemap: true,
    },
  ],
};
