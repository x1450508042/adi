// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "";
      return args;
    });
  },
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4143",
        changeOrigin: true, // target是域名的话，需要这个参数，
        pathRewrite: { "^/api": "" },
      },
    },
  },
  productionSourceMap: true,
};
