const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const getWebpackConfig = require('build-scripts-config').getWebpackConfig;

module.exports = (
  /** @type import('build-scripts/lib/core/Context').IPluginAPI */
  api
) => {
  const { onGetWebpackConfig, registerTask, context: { webpack, command }, registerCliOption, onHook } = api;
  registerTask('fe', getWebpackConfig());
  onGetWebpackConfig('fe', (chain) => {
    chain.devServer.port(8888);
    chain.entryPoints.clear();
    chain.entry('index')
      .add('./src/index.tsx')
      .end();
    chain.externals({
      react: "var window.React",
      "react-dom": "var window.ReactDOM",
    });
    chain.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: path.resolve(__dirname, './tsconfig.json'),
      },
    ]);
    chain.stats('errors-only');
  });

  registerTask('main', getWebpackConfig());
  onGetWebpackConfig('main', chain => {
    chain.entryPoints.clear();
    chain.target('electron10-main');
    chain.entry('main').add('./src/main.ts').end();
    chain.devServer.merge({ devMiddleware: { writeToDisk: (/** @type string */filePath) => {
      return filePath.match(/main.js/);
    }}});
    chain.module.rule('node').test(/\.node$/).use('node-loader').loader('node-loader');
  });
}