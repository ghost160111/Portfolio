import path from "path";
import { fileURLToPath } from "url";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerWebpackPlugin from "css-minimizer-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const disableExtensions = (...extensions) => {
  if (extensions) {
    return [...extensions];
  }
}

const optimizations = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  }

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
}

const addPlugin = (plugin) => {
  this.plugins.push(plugin);
}

const addCopyWebpackPlugin = (patterns) => {
  this.plugins.push(
    new CopyWebpackPlugin({
      patterns: [...patterns]
    })
  );
}

const assetFileName = () => {
  return isDev ? 'assets/[name].[ext]' : 'assets/[name].[hash].[ext]';
}

const fileName = (ext) => {
  switch (ext) {
    case "css": return isDev ? `css/[name].${ext}` : `css/[name].[fullhash].${ext}`;
    case "js": return isDev ? `js/[name].${ext}` : `js/[name].[fullhash].${ext}`;
    default: return isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;
  }
}

const cssLoader = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    "css-loader"
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
}

const babelOptions = (option) => {
  const options = {
    presets: ["@babel/preset-env"]
  }

  if (option) {
    options["presets"].push(option);
  }

  return options;
}

const buildNameOption = () => {
  return (isDev) ? "dist" : "build";
}

const webpackConfig = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js"
  },
  output: {
    filename: fileName("js"),
    path: path.resolve(__dirname, buildNameOption()),
    assetModuleFilename: assetFileName()
  },
  resolve: {
    extensions: disableExtensions(".js", ".ts", ".jsx"),
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  optimization: optimizations(),
  devtool: isDev ? "source-map" : false,
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 4550,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      favicon: "https://portfolio.devcybercode.com/static/main/images/logo/footerlogo.svg"
    }),
    new MiniCssExtractPlugin({
      filename: fileName("css")
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoader()
      },
      {
        test: /\.(sass|scss)$/i,
        use: cssLoader("sass-loader")
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.worker\.(js|ts)$/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.(js|mjs)$/i,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/i,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript")
        }
      },
      {
        test: /\.jsx$/i,
        exclude: "/node-modules",
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react")
        }
      }
    ]
  }
}

export default webpackConfig;
