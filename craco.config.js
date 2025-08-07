module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 添加对markdown文件的支持
      webpackConfig.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
        type: 'javascript/auto'
      });
      
      return webpackConfig;
    }
  }
};
