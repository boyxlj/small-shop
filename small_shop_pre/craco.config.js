const CracoLessPlugin = require('craco-less')
module.exports = {
  plugins: [
    {
       // 使用CracoLessPlugin自定义主题颜色
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
          // 自定义less变量
            modifyVars: {
              '@primary-color': '#CF0A2C', 
            },
            javascriptEnabled: true, 
        },
      }
      },
    },
  ],
}