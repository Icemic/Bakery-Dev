module.exports = {
    entry: "./src/entry.jsx",
    output: {
        path: __dirname,
        filename: "build.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.js|jsx$/, exclude: /node_modules/, loader: "babel-loader"},
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    }
};