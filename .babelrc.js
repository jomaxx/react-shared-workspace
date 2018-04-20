if (process.env.BABEL_ENV === "rollup") {
  module.exports = {
    presets: [
      [
        "env",
        {
          modules: false
        }
      ],
      "react"
    ],
    plugins: [
      "transform-class-properties",
      "transform-object-rest-spread",
      "external-helpers"
    ]
  };
} else {
  module.exports = {
    presets: ["env", "react"],
    plugins: ["transform-class-properties", "transform-object-rest-spread"]
  };
}
