import { DefinePlugin, Configuration, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackHarddiskPlugin from "html-webpack-harddisk-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ProvidePlugin from "webpack/lib/ProvidePlugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

import webpack from "./webpack.config";
import env from "../environments/dev.env";
import { root, subsite } from "./helpers";
import { definePlugin, mergeDeep } from "../utils/function-data";

const devWebpack = mergeDeep(webpack, {
    mode: "development",
    devtool: "cheap-module-source-map",
    stats: {
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[ext]"
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/img/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new DefinePlugin(definePlugin(env)),
        new HtmlWebpackPlugin({
            template: root("./src/index.html"),
            publicPath: subsite("."),
            alwaysWriteToDisk: true,
            inject: true,
            filename: "index.html",
            chunks: ["common", "vendors", "client"]
        }),
        new HtmlWebpackHarddiskPlugin(),
        new HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {
        contentBase: [root("./dist")],
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: true,
        port: "9000",
        proxy: {
            "*": {
                changeOrigin: true,
                target: `http://localhost:2383`,
            }
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        writeToDisk: true
    },
} as Configuration);

export default devWebpack;
