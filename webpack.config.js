const path = require("path");

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    output: {
        filename: "kraytracer.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["awesome-typescript-loader", "source-map-loader", "eslint-loader"],
                exclude: /node_modules/
            }
        ],
    },
    plugins: [
        new CopyPlugin(
            [
                { from: "static", to: "." },
            ],
        ),
    ],
};
