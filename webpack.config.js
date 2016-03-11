module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname+"/build",
        filename: "build.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    }
};