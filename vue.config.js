const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const {
  getPort
} = require('portfinder-sync')
const port = getPort(8000);
// 本地运行vue-cli-service serve --mode dev 的时候 ServerSign = 'dev ';
const ServerSign = process.argv[4] || 'dev';
// 打包时候 运行vue-cli-service build    BuildSign = 'dev';
// 打印process.argv可以看到,node运行的命令所带的参数.
const BuildSign = process.argv[3] || 'dev';
// 根据入口来设置pages 
function setPage() {
  const utilObj = {
    template: './public/index.html',
    filename: "index.html",
    title: "瞰图科技",
  }
  const pages = new Map([
    ['dev', {
      dev: {
        entry: "./src/main.js",
        ...utilObj
      }
    }],
    ['2d', {
      "2d": {
        entry: "./src/2d/main.js",
        ...utilObj
      }
    }],
    ['3d', {
      "3d": {
        entry: "./src/3d/main.js",
        ...utilObj
      }
    }]
  ])

  let page = {
  }; // 如果是PC首页则是index:{...},如果是h5首页,则是h5:{...}
  if (process.env.NODE_ENV == 'development') {
    // 开发环境下,运行不同的命令,打开不同的项目首页
    page = pages.get(ServerSign) || pages.get('dev');
  } else {
    // 生产环境下
    page = pages.get(BuildSign) || pages.get('dev');
  }
  return page;
}

module.exports = {
  lintOnSave: false,
  publicPath: "./",
  outputDir: `dist/`,
  pages: setPage(),
  filenameHashing: true,
  configureWebpack: { // 配置自动导入插件
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [__dirname, 'src/2d/assets/css/global.less']
    }
  },
  devServer: {
    static: {
      directory: './public',
    },
    host: 'local-ip',
    // host: 'localhost',
    port,
    allowedHosts: 'all',
    hot: true,
    open: true,
    proxy: {
      '/open': {
        target: 'https://dapi.seentao.com/custom-form/customForm.formInfos.get',
        changeOrigin: true,
        pathRewrite: {
          '^/open': ''
        }
      },
    },
    historyApiFallback: true
  },
};