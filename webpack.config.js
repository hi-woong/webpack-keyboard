const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"./dist"),
        clean:true
    },
    devtool: "source-map", //빌드한 파일과 원본파일을 서로 연결시켜주는 역할
    mode: "development",
    devServer:{
        host:"localhost",
        port:8081,
        open:true,
        watchFiles: 'index.hmtl'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "keyboard",
            template: "./index.html",
            inject:"body",  //파일을 빌드했을때 자바스크립트파일을 바디부분에 넣어줄꺼냐/헤드부분에 넣어주느냐
            favicon:"./favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename:"style.css"
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization:{
        minimizer:[
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }

}