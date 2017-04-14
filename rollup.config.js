export default {
  entry  : "./src/meaw.js",
  targets: [
    {
      dest  : "./lib/meaw.cjs.js",
      format: "cjs"
    },
    {
      dest  : "./lib/meaw.es.js",
      format: "es"
    }
  ]
};
