// Reference from: https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5


// Webpack uses this to work with directories
const path = require('path');
const miniCssExtractPlugin = require("mini-css-extract-plugin");


// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/javascript/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  mode: 'development',

  // Apply webpack loaders, which apply certain transformations to our code.
  module: {
    rules: [

      // babel-loader: transform our modern JavaScript code to browser-compatible JavaScript code before bundling it.
      {
        // `test` is a regular expression for file extension which we are going to transform.
        // In this case, it's javascript files.
        test: /\.js$/,
        // `exclude` is a regular expression that tells webpack which path should be ignored when transforming modules.
        exclude: /(node_modules)/,
        // `use` defines what loaders are applied to the files that correspond to `test` regexp (JS files in this case).
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },

      // sass-loader: transform SASS to CSS and then apply auto prefixing and minifying.
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left (or think as of bottom to top) (!)
        // The first loader will be applied after others.
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file.
            loader: miniCssExtractPlugin.loader
          },

          {
            // This loader resolves url() and @imports inside CSS.
            loader: "css-loader"
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying.
            loader: "postcss-loader"
          },

          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },

      // file-loader
      {
        // Now we apply rule for images.
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for these files.
            loader: "file-loader",

            // In options we can set different things like format
            // and directory to save.
            options: {
              outputPath: "images"
            }
          }
        ]
      },

      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",

            options: {
              outputPath: "fonts"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // Extract all that transformed CSS into a separate "bundle" file we have to use a plugin.
    new miniCssExtractPlugin({
      filename: "bundle.css"
    })
  ]
};
