module.exports = env => {
    const path = require('path');
    const webpack = require('webpack');
    const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

    return {
        entry: {
            app: path.resolve(__dirname, 'src/index.js')
        },
        output: {
            filename: 'build.js',
            library: "FrameLoader",
            libraryTarget: "umd",
            path: path.resolve(__dirname, 'dest')
        },
        devServer:{
            contentBase: path.join(__dirname, "dest/")
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {test: /\.js$|\.es6$|\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
                {test: /\.dot$/, loader: "dot-loader"},
                {
                    test: /\.less$/, use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
                }
            ]
        },
        resolve: {
            extensions: [".js", ".json", ".less", ".jsx", ".es6"]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env.NODE_ENV)
                }
            }),
            new WebpackCleanupPlugin()
        ]
    };
};