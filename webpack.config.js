const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const devMode = env.production !== true;
    const baseConfig = {
        mode: devMode ? "development" : "production",
        entry: {
            app: "./src/js/index.js",
        },
        output: {
            filename: devMode ? "[name].js" : "[name].[contenthash].js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
            assetModuleFilename: "assets/[hash][ext][query]",
        },
        devtool: devMode ? "inline-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, "src"),
                    use: "babel-loader",
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, "src"),
                    use: [
                        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Open Market",
                template: "./src/index.html",
            }),
        ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
            usedExports: true,
        },
    };
    if (devMode) {
        const devServer = {
            static: "./dist",
            client: {
                overlay: true,
            },
            open: true,
            historyApiFallback: true,
        };
        return {...baseConfig, devServer};
    } else return baseConfig;
};
