/** @type {(env: any, arg: {mode: string}) => import('webpack').Configuration} **/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const webpack = require("webpack");

module.exports = (env, argv) => {
  // console.log("hehehehehehe", env, argv);
  const isProduction = argv.mode === "production";
  /** @type {import('webpack').Configuration} **/
  const webpackConfig = {
    entry: "./src/index.tsx", // Dẫn tới file index.js ta đã tạo
    output: {
      path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
      filename: "static/js/main.[contenthash:6].js", // Tên file được build ra
      // asyncChunks: true,
      // chunkFilename: (pathData) => {
      //   return pathData.chunk.name === "main" ? "[name].js" : "[name]/[name].js";
      // },
      // chunkFormat: "commonjs",
      // chunkLoading: "async-node",
      publicPath: "/",
    },
    devServer: {
      open: false,
      historyApiFallback: { index: "/" },
      hot: true, // hot reloading
      port: 6399, // port on which server will run
      // Cấu hình phục vụ file html trong public
      static: {
        directory: path.resolve(__dirname, "public", "index.html"),
        serveIndex: true,
        watch: true, // khi thay đổi content trong index.html thì cũng sẽ reload
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|jsx|tsx)$/, // Sẽ sử dụng babel-loader cho những file js
          exclude: /node_modules/, // Loại trừ thư mục node_modules
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new CleanWebpackPlugin(),
      new ESLintPlugin({
        extensions: [".tsx", ".ts", ".js", ".jsx"],
      }),
      // Đưa css ra thành một file .css riêng biệt thay vì bỏ vào file .js
      new MiniCssExtractPlugin({
        filename:
          process.env.NODE_ENV === "production"
            ? "static/css/[name].[contenthash:6].css"
            : "[name].css",
      }),
      // Copy mọi files trong folder public trừ file index.html
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            filter: (name) => {
              return !name.endsWith("index.html");
            },
          },
        ],
      }),
      new NodePolyfillPlugin({
        additionalAliases: ["console", "Buffer", "process", "_stream_writable", "cryto", "fs"],
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx", ".mdx"],
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "nemo-aa": "node_modules/nemo-aa",
      },
      fallback: {
        // vm: false,
        // stream: false,
        // crypto: require.resolve("crypto-browserify"),
        // url: false,
        // fs: false,
        // tls: false,
        // net: false,
        // path: false,
        // zlib: false,
        // http: false,
        // https: false,
        // stream: false,
        "sodium-native": require.resolve("sodium-native"),
      },
    },
    stats: {
      errorDetails: true,
    },
  };

  //🚀 Nếu build thì sẽ thêm một số config
  if (isProduction) {
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new webpack.ProgressPlugin(), // Hiển thị % khi build
      // Nén brotli css và js nhưng không hiểu sao chỉ có js được nén 🥲
      new CompressionPlugin({
        test: /\.(css|js)$/,
        algorithm: "brotliCompress",
      }),
      new CleanWebpackPlugin(), // Dọn dẹp thư mục build trước đó để chuẩn bị cho bản build hiện tại
    ];
    webpackConfig.optimization = {
      minimizer: [
        `...`, // Cú pháp kế thừa bộ minimizers mặc định trong webpack 5 (i.e. `terser-webpack-plugin`)
        new CssMinimizerPlugin(), // minify css
      ],
    };
  }

  return webpackConfig;
};
