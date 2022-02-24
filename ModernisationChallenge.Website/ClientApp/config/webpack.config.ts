import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration, ProgressPlugin } from "webpack";

import { root, subsite } from "./helpers";
import { mergeDeep } from "../utils/function-data";

const commonWebpack: Configuration = {
    resolve: {
        alias: {
            "@": root(""),
            "@config": root("/config"),
            "@environments": root("/environments"),
            "@utils": root("/utils"),

            "@services": root("/src/services"),
            "@assets": root("/src/assets"),
            "@components": root("/src/components"),
            "@composables": root("/src/composables"),
            "@models": root("/src/models"),
            "@pages": root("/src/pages"),
        },
        extensions: [".ts", ".js", ".tsx", ".jsx", ".scss", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                exclude: [/node_modules/]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: [/node_modules/]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "common",
                    chunks: "all",
                }
            }
        }
    },
    plugins: [
        new ProgressPlugin(),
        new CleanWebpackPlugin({
            verbose: true,
            dry: false,
            cleanStaleWebpackAssets: false
        })
    ]
};

const webpack: Configuration = mergeDeep(commonWebpack, {
    target: "web",
    name: "client",
    entry: {
        client: [root("src/index.tsx")],
        vendors: ["babel-polyfill"]
    },
    output: {
        module: true,
        path: root("./dist"),
        publicPath: subsite(""),
        chunkFilename: "js/[name].[fullhash].js",
        filename: "js/[name].[fullhash].js",
        assetModuleFilename: "assets/[name][ext]"
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: [/node_modules/]
            }
        ]
    }
} as Configuration);

export default webpack;
