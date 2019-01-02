module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
     transpileDependencies: ['vuex-persist'],

    pwa: {
      name: 'NoticeBoard by Swanand'
    },

  
}