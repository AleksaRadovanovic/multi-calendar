const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
            filename: 'NextCalendarClass.js',
            path: path.resolve(__dirname, 'dist'), 
            libraryTarget: 'var',
            library: 'NxCalendarLib'
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
            filename: 'next-calendar.css',
        })
    ]
};