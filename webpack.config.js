const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        main: './src/app.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader', // 借助ts-loader依赖进行打包
            exclude: /node_modules/ // 除node_modules文件夹下之外的以.ts结尾的文件
        }]
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension
        extensions: ['.ts', '.tsx', '.js']
      },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}