const path = require("path");
module.exports = {
  transpileDependencies: true,
  publicPath: "./",
  outputDir: path.resolve(__dirname, "./example/dist"),
  configureWebpack: {
    entry: "./example/main.ts",
    resolve: {
      fallback: {
        os: require.resolve("os-browserify/browser"),
        assert: require.resolve("assert/"),
      },
      alias: {
        vue$: "vue/dist/vue.esm.js",
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          include: path.resolve(__dirname, 'cover-image'),
          type: 'asset/resource',
          generator: {
            filename: 'cover-image/[name][ext][query]'
          }
        },
      ]
    }
  },
};
