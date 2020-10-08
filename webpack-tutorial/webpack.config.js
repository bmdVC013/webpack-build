// Link: https://www.valentinog.com/blog/webpack/#code-splitting-with-optimizationsplitchunks

// Install nescessary packages
// npm i webpack webpack-cli webpack-dev-server --save-dev

// webpack-dev-server is a convenient package for development. Once configured, we can launch a local server to serve our files.

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  /*
   ** Note
   * 
   * webpack loaders are loaded from right to left, (or think as of top to bottom).
  */


  /*
   ** Configuring webpack
   * 
  */

  // Webpack will look in `source/index.js` for the first file to load.
  // entry: { index: path.resolve(__dirname, "source", "index.js") },

  // To change instead the output of our bundle.
  // with this configuration webpack will put the bundle in `build` instead of `dist`.
  // output: {
  //   path: path.resolve(__dirname, "build")
  // },
  

  /*
   ** Working with webpack's loaders
   * 
   * Deal with various file extensions, for example: css, images, txt files.
  */

  // module: {
  //   rules: [
  //     // Each file we want to treat as a module, we configure an object with a `test` key and with `use`.
  //     {
  //       // `test` tells webpack treat this file as a module
  //       test: /\.filename$/,
  //       // `use` defines what loaders are applied to the file.
  //       use: ["loader-b", "loader-a"]
  //     }
  //   ]
  // },


  /*
   ** Working with CSS
   *
   * npm i css-loader style-loader --save-dev
   * 
   * Helping webpack to understand how to deal with `.css` files.
  */

  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       // style-loader: injecting the style in the page
  //       // css-loader: loading the actual CSS file.
  //       use: ["style-loader", "css-loader"]
  //     }
  //   ]
  // },


  /*
   ** Working with SASS
   *
   * npm i css-loader style-loader sass-loader sass --save-dev
   * 
   * `sass-loader` for loading SASS files with `import`
   * `css-loader` for loading CSS files as modules
   * `style-loader` for loading the stylesheet in the DOM
  */

  /*
   ** Working with modern JavaScript
   *
   * npm i @babel/core babel-loader @babel/preset-env --save-dev
   * 
   * babel is a JavaScript compiler and "transpiler".
   * Given modern JavaScript syntax as input, 
   * babel is able to transform it to compatible code that can run in (almost) any browser.
   * 
   * `babel core`, the actual engine.
   * `babel preset env` for compiling modern Javascript down to ES5.
   * `babel loader` for webpack.
  */

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
        // -> the order in which loaders appear: first, sass-loader, then css-loader, finally style-loader.
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
 

  /*
   ** Working with HTML
   *
   * npm i html-webpack-plugin --save-dev
   *
   * It loads our HTML files
   * It injects the bundle(s) in the same file
  */
 
  plugins: [
    new HtmlWebpackPlugin({
      // Load an HTML template from `src/index.html`.
      template: path.resolve(__dirname, "src", "index.html")
    })
  ],

  /*
   ** Working with JavaScript's modules in webpack
   *
  */


  /*
   ** Production mode
   *
   * npm run build
   * 
   * Produce a minified bundle.
  */


  /*
   ** Code splitting with webpack
   * 
   * avoid big bundles.
   * avoid dependencies duplication.
   * 
   * There is a limit that the webpack community considers the maximum size for the initial bundle of an application: 200KB.
   * 
   * There are three main ways to activate code splitting in webpack:
   * with multiple entry points: works well for smaller projects, but it's not scalable in the long run.
   * with optimization.splitChunks.
   * with dynamic imports.
  */

  /*
   ** Code splitting with optimization.splitChunks
   * 
   * Produce a minified bundle.
  */
  optimization: {
    splitChunks: { chunks: "all" }
    // npm run build
    // -> We now have a vendors~main.js with moment.js, while the main entry point has a more reasonable size.
  },

  /*
   ** Code splitting with dynamic imports
   * 
   * This approach is widely used in modern frontend library like Vue and React
   * Code splitting might be used:
   * at the module level.
   * at the route level.
  */
};

