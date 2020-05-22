const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
        filename: 'SccMainClass.js',
        path: path.resolve(__dirname, 'dist'), 
        libraryTarget: 'var',
        library: 'Scc'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, 
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    }, 
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'scc-style.css',
        })
    ]
};